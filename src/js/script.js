
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
  }
];
import '../pages/index.css'


import {Card} from './Card.js'
import {CardList} from './CardList'
import {BigPicPopup} from './BigPicPopup'
import {FormValidator} from './FormValidator'
import {Popup} from './Popup'
import {UserInfo} from './UserInfo'
import {Append} from './functions'
import {MestoApi} from './MestoAPI'

let url = "https://praktikum.tk";
//let url = "https://95.216.175.5";
window.onload = async function(){
const api = new MestoApi({
  token: "6e4ca745-fc6d-4b7f-8187-06098d577e4b",
  group: "cohort10",
  baseUrl: url
});
const userInfo = new UserInfo();
userInfo.setApi(api);

const cardlistContainer = document.createElement("div");
cardlistContainer.className = "places-list root__section";

const cardPopup = new BigPicPopup();
cardPopup.render();
const newCard = (name, link, bigPicturePopup, id, likes, api) => {
	let card = new Card(name, link, bigPicturePopup, id, likes, api);
	return card;
};
const cardList = new CardList(cardlistContainer, [], newCard, cardPopup, api);
const root = document.querySelector(".root");
try{
  const serverUserInfo = await api.getUser();
  userInfo.setUserInfo(serverUserInfo.name, serverUserInfo.about, serverUserInfo.avatar);
  userInfo.setId(serverUserInfo._id);
}catch(e){console.log('Ошибка!');}
userInfo.updateUserInfo(root, cardList);
try{
  const serverCardList = await api.getCards();
  serverCardList.forEach((item, i) => {
    let _temp = cardList.addCard(item.name, item.link, item._id, item.likes.length);
    if(item.likes.filter(item=>item._id == userInfo.id).length != 0){
      _temp.likes = true;
      _temp.like_button.className+="_liked";
    }
  });
}catch(e){console.log('Ошибка!');}


async function editPopupHandler(e){
  let inputs = e.currentTarget.parentElement.getElementsByTagName("input");
  let serverUpdatedUserInfo = await this.api.updateUserInfo({name:inputs[0].value, about: inputs[1].value});
  this.setUserInfo(serverUpdatedUserInfo.name, serverUpdatedUserInfo.about, serverUpdatedUserInfo.avatar);
}

const editPopup = new Popup("Редактировать профиль", "Сохранить",
			["button_edit","popup__button_edit", "btn_val"], [
			["profile", "Имя", "popup__input_edit popup__input_type_name_edit"],
			["about", "О себе", "popup__input_edit popup__input_type_about_edit"]
		], userInfo.get_edit_bt(), editPopupHandler.bind(userInfo), [userInfo.get_name(), userInfo.get_about()]);
editPopup.setInputValues([userInfo.name, userInfo.about]);
const editValidator = new FormValidator(editPopup.get_container(), 2);
editValidator.setSubmitButtonState();
editPopup.set_validator(editValidator);

const addPopup = new Popup("Новое место", "+",
			["button","popup__button"], [
			["name", "Название", "popup__input popup__input_type_name"],
			["link", "Ссылка на картинку", "popup__input popup__input_type_link-url"]
		], userInfo.get_add_pl_bt(), cardList.cardAddingHandler.bind(cardList));
addPopup.setInputValues(["",""]);
const addValidator = new FormValidator(addPopup.get_container(), 1);
addValidator.setSubmitButtonState();
addPopup.set_validator(addValidator);


Append(root, userInfo.get_rt(), cardList.getCards());
Append(root, editPopup.cont, addPopup.cont, cardPopup.cont);

}
