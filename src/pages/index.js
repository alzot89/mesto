import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { editButton, addButton, saveButton, elements, nameInput, aboutInput, validationConfig } from '../utils/constants.js';

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

let myId;
function getMyId(data) {
    myId = data._id;
};

api.getUserData()
    .then((data) => {
        userInfo.setUserInfo(data);
        getMyId(data);
    });


const userInfo = new UserInfo({ titleSelector: '.profile__title', subtitleSelector: '.profile__subtitle' });
const imagePreview = new PopupWithImage('.popup_type_image');
const profilePopup = new PopupWithForm((item) => {
    saveButton.textContent = 'Сохранение...'
    api.changeUserData(item)
        .then((data) => {
            userInfo.setUserInfo(data)
        })
    saveButton.textContent = 'Сохранить'
},
    '.popup_type_edit'
);

const addCardPopup = new PopupWithForm((item) => {
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
        myId,
        () => {
            imagePreview.open(item);
        },
        (evt) => {
            const deleteConfirmPopup = new PopupWithForm(
                () => {
                    api.deleteCard(item._id);
                    evt.target.closest('.card').remove();
                },
                '.popup_type_confirm'
            );
            deleteConfirmPopup.open()
        },
        (evt) => {
            if (!evt.target.classList.contains('card__like_active')) {
                api.putLike(item._id)
                    .then((data) => {
                        card.changeLikesAmount(data);
                    });
            } else {
                api.deleteLike(item._id)
                    .then((data) => {
                        card.changeLikesAmount(data);
                    })
            }
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
