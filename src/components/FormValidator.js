export class FormValidator {
    constructor(config, formSelector) {
        this._config = config;
        this._form = document.querySelector(formSelector);
        this._button = this._form.querySelector(this._config.saveButtonSelector);
        this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    }

    _showError(input) {
        this._error = this._form.querySelector(`#${input.id}-error`);
        this._error.textContent = input.validationMessage;
        input.classList.add(this._config.inputInvalidClass);
    }

    _hideError(input) {
        this._error = this._form.querySelector(`#${input.id}-error`);
        this._error.textContent = " ";
        input.classList.remove(this._config.inputInvalidClass);
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _setButtonState(isActive) {
        if (!isActive) {
            this._button.classList.add(this._config.saveButtonInvalidClass);
            this._button.disabled = true;
        } else {
            this._button.classList.remove(this._config.saveButtonInvalidClass);
            this._button.disabled = false;
        }
    }

    _setEventListeners() {
        Array.from(this._inputList).forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(this._form.checkValidity())
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
        this._setButtonState(this._form.checkValidity());
    }

    checkFormValidity() {
        Array.from(this._inputList).forEach((input) => {
            this._hideError(input);
        });
        this._setButtonState(this._form.checkValidity());
    }
}