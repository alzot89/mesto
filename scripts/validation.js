function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = " ";
    input.classList.remove(config.inputInvalidClass);
}


function checkInputValidity(form, input, config) {
    if (!input.validity.valid) {
        showError(form, input, config);
    } else {
        hideError(form, input, config);
    }
};

function setButtonState(button, isActive, config) {
    if (!isActive) {
        button.classList.add(config.saveButtonInvalidClass);
        button.disabled = true;
    } else {
        button.classList.remove(config.saveButtonInvalidClass);
        button.disabled = false;
    }
};



function setEventListeners(form, config) {
    const inputsList = form.querySelectorAll(config.inputSelector);
    const saveButton = form.querySelector(config.saveButtonSelector);
    Array.from(inputsList).forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, config);
            setButtonState(saveButton, form.checkValidity(), config)
        });
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    Array.from(forms).forEach((form) => {
        setEventListeners(form, config);
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            form.reset();
        });
        const saveButton = form.querySelector(config.saveButtonSelector);
        setButtonState(saveButton, form.checkValidity(), config);
    });
};


const validationConfig = {
    formSelector: '.popup__form',
    saveButtonSelector: '.popup__save',
    inputSelector: '.popup__input',
    inputInvalidClass: 'popup__input_state_invalid',
    saveButtonInvalidClass: 'popup__save_invalid',
    errorMessage: '.error'
}

enableValidation(validationConfig);