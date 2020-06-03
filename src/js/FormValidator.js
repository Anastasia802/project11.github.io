export class FormValidator{
	constructor(container, number){
		this.validate = container;
		this.number = number;
		this.setEventListeners();
	}

	checkInputValidity(input, validate){
		if (input.value.length === 0) {
			input.nextElementSibling.textContent  = "Это обязательное поле";
			return false;
		  }else if ((input.value.length <= 1 || input.value.length >= 30) && validate) {
			input.nextElementSibling.textContent = "Должно быть от 2 до 30 символов";
			return false;
		  }
		  input.nextElementSibling.textContent = "";
		  return true;
	}

	setSubmitButtonState(){
		let t = true;
		const inputs = this.validate.getElementsByTagName("input");
		const btn = this.validate.getElementsByTagName("button")[0];
		for(let i = 0; i < inputs.length; i++){
			let vl = i<this.number;
			let tmp = this.checkInputValidity(inputs[i], vl);
			t = t ? tmp : t;
		}
		if(!t){
			btn.setAttribute("disabled", "true");
		}else{
			btn.removeAttribute("disabled");
		}
	}

	setEventListeners(){
		const inputs = this.validate.getElementsByTagName("input");
		for(const el of inputs){
			el.addEventListener("input", this.setSubmitButtonState.bind(this));
		}
	}
}
