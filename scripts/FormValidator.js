export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputInvalidClass);
    }

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = " ";
        input.classList.remove(this._config.inputInvalidClass);
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _setButtonState(isActive, button) {
        if (!isActive) {
            button.classList.add(this._config.saveButtonInvalidClass);
            button.disabled = true;
        } else {
            button.classList.remove(this._config.saveButtonInvalidClass);
            button.disabled = false;
        }
    }

    _setEventListeners() {
        const saveButton = this._form.querySelector(this._config.saveButtonSelector)
        const inputsList = this._form.querySelectorAll(this._config.inputSelector)
        Array.from(inputsList).forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(this._form.checkValidity(), saveButton)
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
        const saveButton = this._form.querySelector(this._config.saveButtonSelector)
        this._setButtonState(this._form.checkValidity(), saveButton);
    }
}