class Card{

	constructor(name, photo, pp, id, likes, api){
		this.name = name;
		this.photo = photo;
		this.likes = false;
		this.popup = pp;
		this.id = id;
		this.likes_am = likes;
		this.api = api;
	}

	async like(){
		try{
			this.likes = this.likes ? false : true;
			this.like_button.className = "place-card__like-icon";
			let res = {};
			if(this.likes){
				res = await this.api.putdel_like(this.id,"PUT");
				this.like_button.className += "_liked";
			}
			else {
				res = await this.api.putdel_like(this.id,"DELETE");
			}
			console.log(res);
			this.likes_am = res.likes.length;
			this.likes_amount.textContent = this.likes_am;
		}catch(e){console.log('Ошибка!');}
	}

	remove(){
		this.d.parentNode.removeChild(this.d);
		this.like_button.removeEventListener('click', this.like);
		this.del_button.removeEventListener('click', this.remove);
		this.card_image.removeEventListener('click', this.big_pic);
	}

	big_pic(e){
		if(e.target == e.currentTarget)
		this.popup.open(this.photo);
	}

	create(){

		let card = CreateDOMElement({
			tag: "div",
			classes: ["place-card"]
		})


		this.card_image = CreateDOMElement({
			tag: "div",
			classes: ["place-card__image"],
			styles:{
				background_image: `url(${this.photo})`
			},
			events:{click: this.big_pic.bind(this)}
		})


		this.del_button = CreateDOMElement({
			tag: "div",
			classes: ["place-card__delete-icon"],
			events: {click: this.remove.bind(this)}
		})


		let card_descr = CreateDOMElement({
			tag: "div",
			classes: ["place-card__description"]
		});

		let c_name = CreateDOMElement({
			tag: "h3",
			classes: "place-card__name",
			text: `${this.name}`
		})

		const like_wrapper = CreateDOMElement({
			tag: "div"
		})
		like_wrapper.style.textAlign = "center";
		this.like_button = CreateDOMElement({
			tag: "button",
			classes: ["place-card__like-icon"],
			events: {click: this.like.bind(this)}
		})
		this.likes_amount = CreateDOMElement({
			tag: "p",
			text: this.likes_am
		})
		Append(like_wrapper, this.like_button, this.likes_amount);
		Append(card_descr, c_name, like_wrapper);
		Append(this.card_image, this.del_button);
		Append(card, this.card_image, card_descr);
		this.d = card;
		return card;
	}
}
