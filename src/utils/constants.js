import Barselona from '../images/Barselona.jpg';
import Porto from '../images/Porto.jpg';
import LezArc from '../images/Lez-Ark.jpg';
import ShriLanka from '../images/Shri-Lanka.jpg';
import Bali from '../images/Bali.jpg';
import Copenhagen from '../images/Copenhagen.jpg';

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.button_type_edit');
const addButton = profile.querySelector('.button_type_add');
const elements = document.querySelector('.elements__list');
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

export { editButton, addButton, elements, nameInput, jobInput, validationConfig, initialCards };