class UserInfo{
	constructor(){

	}

	editPopupHandler(e){
		let inputs = e.currentTarget.parentElement.getElementsByTagName("input");
		this.setUserInfo(inputs[0].value, inputs[1].value, this.photo);
	}

	setApi(api){
		this.api = api;
	}

	get_name(){
		return this.nm;
	}
	get_about(){
		return this.ab;
	}

	setId(id){
		this.id = id;
	}

	setUserInfo(name, about, photo){
		this.name = name;
		this.about = about;
		this.photo = photo;
		try{
			this.nm.textContent = `${this.name}`;
			this.ab.textContent = `${this.about}`;
		}catch(Exception){}
	}


	render(container){
		this.rt = CreateDOMElement({
			tag: "div",
			classes: ["profile", "root__section"]
		});


		let cont = CreateDOMElement({
			tag: "div",
			classes: ["user-info"]
		});

		let ph = CreateDOMElement({
			tag: "div",
			classes: ["user-info__photo"],
			style: {background_image: `${this.photo} !important`}
		});

		let mainInfo = CreateDOMElement({
			tag: "div",
			classes: ["user-info__data"]
		});

		this.nm = CreateDOMElement({
			tag: "h1",
			classes: ["user-info__name"],
			text: `${this.name}`
		})


		this.ab = CreateDOMElement({
			tag: "p",
			classes: ["user-info__job"],
			text: `${this.about}`
		})

		this.edit_bt = CreateDOMElement({
			tag: "button",
			classes: ["button_edit","user-info__button_edit"],
			text: "Edit"
		});

		this.add_place_bt = CreateDOMElement({
			tag: "button",
			classes: ["button", "user-info__button"],
			text: "+"
		});



		Append(mainInfo, this.nm, this.ab, this.edit_bt);
		Append(cont, ph, mainInfo, this.add_place_bt);
		Append(this.rt, cont);
	}

	get_edit_bt(){
		return this.edit_bt;
	}

	get_add_pl_bt(){
		return this.add_place_bt;
	}

	get_rt(){
		return this.rt;
	}

	updateUserInfo(container){
		this.render(container);
	}
}
