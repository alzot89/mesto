import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { editButton, addButton, saveButton, avatarEditor, setAvatarButton, createButton, elements, nameInput, aboutInput, validationConfig } from '../utils/constants.js';

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1',
    token: '94f8771a-5db3-4407-bf14-903dd1dba9af',
    groupId: 'cohort-19'
});

function createCard(item) {
    const card = new Card(
        item,
        myId,
        () => {
            imagePreview.open(item);
        },
        (evt) => {
            const card = evt.target.closest('.card');
            deleteConfirmPopup.open(item, card);
        },
        () => {
            if (card.checkLikeStatus()) {
                api.putLike(item._id)
                    .then((data) => {
                        card.changeLikesAmount(data);
                        card.switchLikeStatus()
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            } else {
                api.deleteLike(item._id)
                    .then((data) => {
                        card.changeLikesAmount(data);
                        card.switchLikeStatus();
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        },
        '#template-card');
    const cardElement = card.getCard();
    return cardElement
}

const initialCardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        initialCardList.addItem(cardElement);
    }
}, elements)

api.getCardsData()
    .then((data) => {
        initialCardList.renderItems(data);
    })
    .catch((err) => {
        elements.innerHTML = `<p style="color: white">Что-то пошло не так ${err}</p>`
    });

let myId;
function setMyId(data) {
    myId = data._id;
};

api.getUserData()
    .then((data) => {
        userInfo.setUserInfo(data);
        userInfo.setAvatar(data);
        setMyId(data);
    })
    .catch((err) => {
        const title = document.querySelector('.profile__title');
        title.textContent = `${err}`
    });

const userInfo = new UserInfo({ titleSelector: '.profile__title', subtitleSelector: '.profile__subtitle', avatarSelector: '.profile__avatar' });
const imagePreview = new PopupWithImage('.popup_type_image');
const profilePopup = new PopupWithForm((item) => {
    saveButton.textContent = 'Сохранение...'
    api.changeUserData(item)
        .then((data) => {
            userInfo.setUserInfo(data);
            profilePopup.close();
            saveButton.textContent = 'Сохранить'
        })
        .catch((err) => {
            const title = document.querySelector('.profile__title');
            const subtitle = document.querySelector('.profile__subtitle');
            subtitle.textContent = ""
            title.textContent = `${err}`;
            profilePopup.close();
            saveButton.textContent = 'Сохранить'
        });
},
    '.popup_type_edit'
);

const addCardPopup = new PopupWithForm((item) => {
    createButton.textContent = 'Создание...'
    api.setCardData(item)
        .then((data) => {
            const cardElement = createCard(data);
            initialCardList.addNewItem(cardElement);
            addCardPopup.close();
            createButton.textContent = 'Создать'
        })
        .catch((err) => {
            createButton.textContent = `${err}`
        })
},
    '.popup_type_add'
);

const changeAvatarPopup = new PopupWithForm((item) => {
    setAvatarButton.textContent = 'Сохранение...';
    api.changeAvatar(item)
        .then((data) => {
            userInfo.setAvatar(data);
            changeAvatarPopup.close();
            setAvatarButton.textContent = 'Сохранить';
        })
        .catch((err) => {
            setAvatarButton.textContent = `${err}`
        })
},
    '.popup_type_avatar'
);

const deleteConfirmPopup = new PopupConfirm((data, card) => {
    api.deleteCard(data._id)
        .catch((err) => {
            console.log(err);
        });
    card.remove();
    deleteConfirmPopup.close();
},
    '.popup_type_confirm'
);

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

avatarEditor.addEventListener('click', () => {
    changeAvatarForm.checkFormValidity();
    changeAvatarPopup.open();
});

const profileForm = new FormValidator(validationConfig, '.popup__form_type_edit');
const addCardForm = new FormValidator(validationConfig, '.popup__form_type_add');
const changeAvatarForm = new FormValidator(validationConfig, '.popup__form_type_avatar')
profileForm.enableValidation();
addCardForm.enableValidation();
changeAvatarForm.enableValidation();
