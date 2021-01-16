import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { editButton, addButton, elements, nameInput, aboutInput, validationConfig } from '../utils/constants.js';

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1',
    token: '94f8771a-5db3-4407-bf14-903dd1dba9af',
    groupId: 'cohort-19'
});

const initialCardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        initialCardList.addItem(cardElement);
    }
}, elements)

api.getCardsData()
    .then((data) => {
        initialCardList.renderItems(data);
    });

api.getUserInfo()
    .then((data) => {
        userInfo.setUserInfo(data)
    });

const userInfo = new UserInfo({ titleSelector: '.profile__title', subtitleSelector: '.profile__subtitle' });
const imagePreview = new PopupWithImage('.popup_type_image');
const profilePopup = new PopupWithForm((item) => {
    api.changeUserInfo(item)
        .then((data) => {
            userInfo.setUserInfo(data)
        })
},
    '.popup_type_edit'
);

const addCardPopup = new PopupWithForm(
    (item) => {
        api.setCardData(item)
            .then((data) => {
                const cardElement = createCard(data);
                initialCardList.addItem(cardElement);
            })
    },
    '.popup_type_add'
);

function createCard(item) {
    const card = new Card(
        item,
        () => {
            imagePreview.open(item);
        },
        '#template-card');
    const cardElement = card.getCard();
    return cardElement
}

addButton.addEventListener('click', () => {
    addCardForm.checkFormValidity();
    addCardPopup.open();
});


editButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
    profileForm.checkFormValidity();
    profilePopup.open();
});

const profileForm = new FormValidator(validationConfig, '.popup__form_type_edit');
const addCardForm = new FormValidator(validationConfig, '.popup__form_type_add');
profileForm.enableValidation();
addCardForm.enableValidation();
