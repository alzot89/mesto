import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(handleFormSubmit, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitHandler = this._submitHandler.bind(this);
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler)
    }

    _submitHandler(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
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

    _removeEventListeners() {
        super._removeEventListeners();
        this._form.removeEventListener('submit', this._submitHandler);
    }
}