
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.button_type_edit');
const addButton = profile.querySelector('.button_type_add');
const avatarEditor = profile.querySelector('.button_type_avatar');
const elements = document.querySelector('.elements__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const createButton = popupTypeAdd.querySelector('.popup__save');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const aboutInput = popupTypeEdit.querySelector('.popup__input_type_about');
const saveButton = popupTypeEdit.querySelector('.popup__save');
const setAvatarButton = popupTypeAvatar.querySelector('.popup__save');

const validationConfig = {
    formSelector: '.popup__form',
    saveButtonSelector: '.popup__save',
    inputSelector: '.popup__input',
    inputInvalidClass: 'popup__input_state_invalid',
    saveButtonInvalidClass: 'popup__save_invalid',
    errorMessage: '.error'
}

export { editButton, addButton, saveButton, avatarEditor, setAvatarButton, createButton, elements, nameInput, aboutInput, validationConfig };