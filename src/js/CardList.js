
export class CardList{
	constructor(dom_element, initialCards, ncard, pp, api){
		this.ncard = ncard;
		this.container = dom_element;
		this.initialCards = initialCards;
		this.card_pp = pp;
		this.api = api;
	}

	async cardAddingHandler(e){
			const inputs = e.currentTarget.parentElement.getElementsByTagName("input");
			let newcard = await this.api.create_card(inputs[0].value, inputs[1].value);
			this.addCard(newcard.name, newcard.link, newcard._id, newcard.likes.length);
	}


	addCard(name, link, id, likes){
		let cd = this.ncard(name, link, this.card_pp, id, likes, this.api);
		this.container.appendChild(cd.create());
		return cd;
	}


	getCards(){
		return this.render();
	}

	render(){
		this.initialCards.forEach((el)=>{
			this.addCard(el.name, el.link);
		});
		return this.container;
	}
}
