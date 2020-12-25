import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(handleFormSubmit, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitHandler = this._submitHandler.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler)
    }

    _submitHandler(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
    }

    open() {
        super.open();
        this._removeErrorMessages();
        this._setButtonState(this._form.checkValidity());
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    _setButtonState(isActive) {
        const button = this._form.querySelector('.popup__save')
        if (!isActive) {
            button.classList.add('popup__save_invalid');
            button.disabled = true;
        } else {
            button.classList.remove('popup__save_invalid');
            button.disabled = false;
        }
    }

    _removeErrorMessages() {
        this._errorList = this._form.querySelectorAll('.error');
        this._errorList.forEach((error) => {
            error.textContent = " ";
        });
        this._inputList.forEach((input) => {
            input.classList.remove('popup__input_state_invalid');
        });
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._form.removeEventListener('submit', this._submitHandler);
    }
}