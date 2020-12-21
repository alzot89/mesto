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

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');

const formEdit = popupTypeEdit.querySelector('.popup__form');
const formAdd = popupTypeAdd.querySelector('.popup__form');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');

const inputName = formEdit.querySelector('.popup__input_type_name');
const inputJob = formEdit.querySelector('.popup__input_type_job');

const imageName = formAdd.querySelector('.popup__input_type_image');
const imageLink = formAdd.querySelector('.popup__input_type_link');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.button_type_edit');
const addButton = profile.querySelector('.button_type_add');
const title = profile.querySelector('.profile__title');
const subtitle = profile.querySelector('.profile__subtitle');

const elements = document.querySelector('.elements__list');

const formsList = document.querySelectorAll('.popup__form');

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
        name: 'Порту',
        link: Porto,
        alt: 'картинка: Порту'
    },
    {
        name: 'Lez Arc Франция',
        link: LezArc,
        alt: 'картинка: Lez Arc Франция'
    },
    {
        name: 'Шри-Ланка',
        link: ShriLanka,
        alt: 'картинка: Шри-Ланка'
    },
    {
        name: 'Бали',
        link: Bali,
        alt: 'картинка: Бали'
    },
    {
        name: 'Копенгаген',
        link: Copenhagen,
        alt: 'картинка: Копенгаген'
    },
    {
        name: 'Барселона',
        link: Barselona,
        alt: 'картинка: Барселона'
    }
];

const newCard = [{ name: imageName.value, link: imageLink.value, alt: `картинка: ${imageName.value}` }];

const findOpenedPopup = function () {
    const popup = document.querySelector('.popup_opened');
    return popup;
};

function removeErrorMessage(popup) {
    const errors = popup.querySelectorAll(validationConfig.errorMessage);
    Array.from(errors).forEach((error) => {
        error.textContent = " ";
    });
    const inputs = popup.querySelectorAll(validationConfig.inputSelector);
    Array.from(inputs).forEach((input) => {
        input.classList.remove(validationConfig.inputInvalidClass);
    });
    const form = popup.querySelector(validationConfig.formSelector);
    form.reset();
};

function closePopupByEsc(evt) {
    const popup = findOpenedPopup();
    if (evt.key === 'Escape') {
        closePopup(popup);
    };
};

function closePopupOnOverlay(evt) {
    const popup = findOpenedPopup();
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closePopup(popup);
    };
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('mousedown', closePopupOnOverlay);
    document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('mousedown', closePopupOnOverlay);
    document.removeEventListener('keydown', closePopupByEsc);
};

function openEditPopup() {
    openPopup(popupTypeEdit);
    removeErrorMessage(popupTypeEdit);
    inputName.value = title.textContent;
    inputJob.value = subtitle.textContent;
    const saveButton = popupTypeEdit.querySelector(validationConfig.saveButtonSelector);
    saveButton.classList.remove(validationConfig.saveButtonInvalidClass);
};

function openAddPopup() {
    openPopup(popupTypeAdd);
    removeErrorMessage(popupTypeAdd);
    const saveButton = popupTypeAdd.querySelector(validationConfig.saveButtonSelector);
    saveButton.classList.add(validationConfig.saveButtonInvalidClass);
};

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup)
formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    title.textContent = inputName.value;
    subtitle.textContent = inputJob.value;
    closePopup(popupTypeEdit);
});
formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCardList = new Section({
        data: newCard,
        renderer: (item) => {
            const card = new Card(item, '#template-card');
            const cardElement = card.getCard();
            newCardList.addItem(cardElement);
        }
    }, elements);
    newCardList.renderItems();
    formAdd.reset();
    closePopup(popupTypeAdd);
});

Array.from(formsList).forEach((form) => {
    const validateForm = new FormValidator(validationConfig, form);
    validateForm.enableValidation();
});

const initialCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#template-card');
        const cardElement = card.getCard();
        initialCardList.addItem(cardElement);
    }
}, elements);

initialCardList.renderItems();

export { openPopup, popupTypeImage, popupImage, popupImageTitle }

