
const initialCards = [
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
//userInfo.setUserInfo("Jaques Causteau", "Sailor, Researcher", "");
try{
  const serverUserInfo = await api.getUser();
  userInfo.setUserInfo(serverUserInfo.name, serverUserInfo.about, serverUserInfo.avatar);
  userInfo.setId(serverUserInfo._id);
}catch(e){console.log('Ошибка!');}
//userInfo.setUserInfo(buser.name, buser.about, buser.avatar);
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
  //this.setUserInfo(inputs[0].value, inputs[1].value, this.photo);
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

/*
  Ревью по 9 проектной работе:
  Отлично, что создан класс Api, необходимые запросы на сервер выполняются, данные
  пользователя обновляются. Но по организации кода есть ряд замечаний:

  Надо исправить:
  - класс Api должен только выполнять запросы к серверу и не участвовать в обновлении страницы
  т.к. выполнять запросы к серверу возможно понадобится из нескольких мест в скрипте, и
  для каждого места потребуется соответсвующая обработка данных. Сейчас же обработка данных
  захардкожена в методах класса Api. Нужно возвращать из методов данные и их обработку (отображение их на странице)
  делать там, где методы класса Api вызываются.

  - не хватает проверок, что запросы выполняются успешно - res.ok

  - нет обработки ошибок при запросах к серверу, обязательно нужно отлавливать ошибки блоком catch
  Он должен располагаться в самом конце обработки промиса.
  Сейчас достаточно вывести их в консоль

  - все изменения на странице должны происходить, только после того, как
   сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
   данные на странице сохраняться, то это может ввести пользователя в заблуждение
   Поэтому закрывать попап так же нужно только после ответа сервера подтверждением

  Можно лучше:
  - довольно общее название для класса Api, лучше отразить назначение сервера, например MestoApi

  Замечания "Можно лучше" по остальной части проекта:
  - в js общепринятым стилем форматирования является camelCase, в дипломе на это есть критерий "camelCase для параметров, методов и переменных"
  - очень много сокращений, в дипломе на это есть критерий "отсутсвует транслит и неуместные сокращения"
  - для вставки текста (.innerHTML  = "Это обязательное поле";) нужно использовать свойство textContent
  - есть переменные которые не перезаписываются, но всеравно объявлены как let
  - создание разметки через CreateDOMElement не самое удобное в использовании и поддержке
  Лучше создавать элементы через insertAdjacentHTML и интерполяцию шаблонной строки, например:

    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
    <div class="place-card">
        <div class="place-card__image style="background-image: url(${sanitizeHTML(item.link)})"">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name">${sanitizeHTML(item.name)}</h3>
            <button class="place-card__like-icon"></button>
        </div>
    </div>`);
    const placeCard = template.firstElementChild;

	//функция sanitizeHTML предназначения для борьбы с xss - не позволяет вставлять в данных пользователя как html
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

  Так же для создания разметки можно использовать тег template
  https://learn.javascript.ru/template-tag
  https://frontender.info/template/
*/


/*
    Отлично, теперь:
    - класс отвечает только за обмен с сервером
    - есть проверка выполнения запроса 
    - есть обработка ошибок (в реальном проекте лучше сообщить об ошибке пользователя, а не только выводить в консоль)
    - попап закрывается только если запрос выполнен успешно

    Обязательно при выполнении диплома тщательно ознакомьтесь с критериями проверки и учтите замечания из прошлого ревью

    Успехов в дальнейшем обучении!
*/
