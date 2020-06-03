class BigPicPopup{
	constructor(){

	}
	close(){
		this.cont.className = "popup_image";
	}
	open(photo){
		this.cont.className = "popup_image popup_is-opened";
		this.img.src = photo;
	}
	render(){
		this.cont = CreateDOMElement({
			tag: "div",
			classes: ["popup_image"]
		});

		const popup = CreateDOMElement({
			tag: "div",
			classes: ["popup__image-container"]
		});

		const close_button = CreateDOMElement({
			tag: "img",
			classes: ["popup__close"],
			src: "./images/close.svg",
			events: {click: this.close.bind(this)}
		});
		this.img = CreateDOMElement({
			tag: "img",
			classes: ["popup_image_big"]
		});
		Append(popup, this.img, close_button);
		Append(this.cont, popup);
	}
}