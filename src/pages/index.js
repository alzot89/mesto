import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import { editButton, addButton, elements, nameInput, jobInput, validationConfig, initialCards } from '../utils/constants.js'

const userInfo = new UserInfo({ titleSelector: '.profile__title', subtitleSelector: '.profile__subtitle' });
const imagePreview = new PopupWithImage('.popup_type_image');
const profilePopup = new PopupWithForm((item) => { userInfo.setUserInfo(item) }, '.popup_type_edit')
const addCardPopup = new PopupWithForm(
    (item) => {
        const cardElement = createCard(item);
        initialCardList.addItem(cardElement);
    },
    '.popup_type_add'
)

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
    jobInput.value = userData.job;
    profileForm.checkFormValidity();
    profilePopup.open();
});

const initialCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        initialCardList.addItem(cardElement);
    }
}, elements)

initialCardList.renderItems();

const profileForm = new FormValidator(validationConfig, '.popup__form_type_edit');
const addCardForm = new FormValidator(validationConfig, '.popup__form_type_add');
profileForm.enableValidation();
addCardForm.enableValidation();
