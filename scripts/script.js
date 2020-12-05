import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const findOpenedPopup = function () {
    const popup = document.querySelector('.popup_opened');
    return popup;
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
    const form = popupTypeEdit.querySelector(validationConfig.formSelector);
    const validateForm = new FormValidator(validationConfig, form);
    validateForm.enableValidation();

};

function openAddPopup() {
    openPopup(popupTypeAdd);
    removeErrorMessage(popupTypeAdd);
    const form = popupTypeAdd.querySelector(validationConfig.formSelector);
    const validateForm = new FormValidator(validationConfig, form);
    validateForm.enableValidation();
};

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup)
formEdit.addEventListener('submit', () => {
    title.textContent = inputName.value;
    subtitle.textContent = inputJob.value;
    closePopup(popupTypeEdit);
});

const initialCards = [
    {
        name: 'Порту',
        link: './images/Porto.jpg',
        alt: 'картинка: Порту'
    },
    {
        name: 'Lez Arc Франция',
        link: './images/Lez-Ark.jpg',
        alt: 'картинка: Lez Arc Франция'
    },
    {
        name: 'Шри-Ланка',
        link: './images/Shri-Lanka.jpg',
        alt: 'картинка: Шри-Ланка'
    },
    {
        name: 'Бали',
        link: './images/Bali.jpg',
        alt: 'картинка: Бали'
    },
    {
        name: 'Копенгаген',
        link: './images/Copenhagen.JPG',
        alt: 'картинка: Копенгаген'
    },
    {
        name: 'Барселона',
        link: './images/Barselona.jpg',
        alt: 'картинка: Барселона'
    }
];

function popupTypeImageHandler(evt) {
    openPopup(popupTypeImage);
    popupImage.src = evt.target.src;
    popupImageTitle.textContent = imageName.value;
    popupImage.alt = imageName.value;
}

initialCards.forEach((item) => {
    const card = new Card(item, '#template-card');
    const cardElement = card.getCard();
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', popupTypeImageHandler);
    elements.prepend(cardElement);
});

formAdd.addEventListener('submit', () => {
    const card = new Card({ name: imageName.value, link: imageLink.value, alt: `картинка: ${imageName.value}` }, '#template-card');
    const cardElement = card.getCard();
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', popupTypeImageHandler);
    elements.prepend(cardElement);
    closePopup(popupTypeAdd);
});

const validationConfig = {
    formSelector: '.popup__form',
    saveButtonSelector: '.popup__save',
    inputSelector: '.popup__input',
    inputInvalidClass: 'popup__input_state_invalid',
    saveButtonInvalidClass: 'popup__save_invalid',
    errorMessage: '.error'
}


