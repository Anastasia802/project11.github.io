

class Popup{
	constructor(header_text, button_text, button_classes, inputs, popup_but, but_action, in_val){
		this.header = header_text;
		this.btn_text = button_text;
		this.bcl = button_classes;
		this.inputs = inputs;
		this.toggle = popup_but;
		this.act = but_action;
		try{
			this.in_val = in_val;
		}catch(Exception){}
	}

	get_container(){
		return this.cont;
	}

	close(){
		this.cont.className = "popup";
	}

	open(){
		try{
			const inpts = this.cont.getElementsByTagName("input");
			for(let i = 0;i<this.in_val.length;i++){
				inpts[i].value = this.in_val[i].textContent;
			}
		}catch(Exception){}
		this.validator.setSubmitButtonState();
		this.cont.className = "popup popup_is-opened";
	}

	set_validator(validator){
		this.validator = validator;
	}

	render(){
		const cont = CreateDOMElement({
			tag: "div",
			classes: ["popup"]
		});

		const popup = CreateDOMElement({
			tag: "div",
			classes: ["popup__content"]
		});

		const close_button = CreateDOMElement({
			tag: "img",
			classes: ["popup__close"],
			src: "./images/close.svg",
			events: {click: this.close.bind(this)}
		});

		const header = CreateDOMElement({
			tag: "h3",
			text: `${this.header}`
		});


		const frm = CreateDOMElement({
			tag: "form",
			classes: ["popup__form"],
			name: "new",
			submit: false
		});


		let i =0;
		this.inputs.forEach(el =>{
			let pre_val = "";
			try{
				pre_val = `${this.vls[i]}`;
			}catch(Exception){}
			let input = CreateDOMElement({
				tag: "input",
				classes: ["popup__input",`${el[2]}`],
				id: `${el[0]}`,
				name: `${el[0]}`,
				placeholder: `${el[1]}`,
				value: pre_val
			});


			let err = CreateDOMElement({
				tag: "div",
				classes: ["error-message"]
			});
			Append(frm, input, err);
			i++;
		});

		const subm_btn = CreateDOMElement({
			tag: "button",
			classes: this.bcl,
			text: `${this.btn_text}`,
			events: {click: this.subm.bind(this)},
			type: "button"
		});
		Append(frm, subm_btn);
		Append(popup, close_button, header, frm);
		Append(cont, popup);

		this.toggle.addEventListener("click", this.open.bind(this));

		this.cont = cont;
	}

	async subm(e){
		try{
			await this.act(e);
			this.close();
		}catch(e){console.log('Ошибка! '+e);}
	}

	setInputValues(vals){
		let i = 0;
		this.vls = [];
		for(i = 0; i< vals.length; i++){
			this.vls[i] = vals[i];
		}
		this.render();
	}

}
