import './index.css';
import Barselona from '../images/Barselona.jpg';
import Porto from '../images/Porto.jpg';
import LezArc from '../images/Lez-Ark.jpg';
import ShriLanka from '../images/Shri-Lanka.jpg';
import Bali from '../images/Bali.jpg';
import Copenhagen from '../images/Copenhagen.jpg';

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js';

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.button_type_edit');
const addButton = profile.querySelector('.button_type_add');
const elements = document.querySelector('.elements__list');
const formsList = document.querySelectorAll('.popup__form');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_job');

const validationConfig = {
    formSelector: '.popup__form',
    saveButtonSelector: '.popup__save',
    inputSelector: '.popup__input',
    inputInvalidClass: 'popup__input_state_invalid',
    saveButtonInvalidClass: 'popup__save_invalid',
    errorMessage: '.error'
}

const initialCards = [
    {
        image: 'Порту',
        link: Porto,
    },
    {
        image: 'Lez Arc Франция',
        link: LezArc,
    },
    {
        image: 'Шри-Ланка',
        link: ShriLanka,
    },
    {
        image: 'Бали',
        link: Bali,
    },
    {
        image: 'Копенгаген',
        link: Copenhagen,
    },
    {
        image: 'Барселона',
        link: Barselona,
    }
];

const userInfo = new UserInfo({ titleSelector: '.profile__title', subtitleSelector: '.profile__subtitle' });
const imagePreview = new PopupWithImage('.popup_type_image');

editButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    const formSubmited = new PopupWithForm(
        (item) => {
            userInfo.setUserInfo(item);
        },
        '.popup_type_edit'
    )
    formSubmited.open();
});

addButton.addEventListener('click', () => {
    const formSubmited = new PopupWithForm(
        (item) => {
            const card = new Card(
                item,
                () => {
                    imagePreview.open(item);
                },
                '#template-card');
            const cardElement = card.getCard();
            elements.prepend(cardElement);
        },
        '.popup_type_add'
    )
    formSubmited.open();
});

const initialCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item, () => { imagePreview.open(item) }, '#template-card')
        const cardElement = card.getCard(item);
        initialCardList.addItem(cardElement);
    }
}, elements)

initialCardList.renderItems();

Array.from(formsList).forEach((form) => {
    const validateForm = new FormValidator(validationConfig, form);
    validateForm.enableValidation();
});
