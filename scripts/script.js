const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');

const formEdit = popupTypeEdit.querySelector('.popup__form');
const formAdd = popupTypeAdd.querySelector('.popup__form');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');

const inputName = formEdit.querySelector('.popup__input_type_name');
const inputJob = formEdit.querySelector('.popup__input_type_job');

const imageName = formAdd.querySelector('.popup__input_type_image');
const imageLink = formAdd.querySelector('.popup__input_type_link');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.button_type_edit');
const addButton = profile.querySelector('.button_type_add');
const title = profile.querySelector('.profile__title');
const subtitle = profile.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#template-card').content;

const popupOpened = function () {
    const popup = document.querySelector('.popup_opened');
    return popup;
};

function removeErrorMessage(popup) {
    const errors = popup.querySelectorAll(validationConfig.errorMessage);
    Array.from(errors).forEach((error) => {
        error.textContent = " ";
    });
    const inputs = popup.querySelectorAll(validationConfig.inputSelector);
    Array.from(inputs).forEach((input) => {
        input.classList.remove(validationConfig.inputInvalidClass);
    });
};


function closePopupByEsc(evt) {
    const popup = popupOpened();
    if (evt.key === 'Escape') {
        closePopup(popup);
    };
};

function closePopupOnOverlay(evt) {
    const popup = popupOpened();
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closePopup(popup);
    };
};


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('mousedown', closePopupOnOverlay);
    document.addEventListener('keydown', closePopupByEsc);
    const form = popup.querySelector(validationConfig.formSelector);
    const saveButton = form.querySelector(validationConfig.saveButtonSelector);
    setButtonState(saveButton, form.checkValidity(), validationConfig);
};

function closePopup(popup) {
    const form = popup.querySelector(validationConfig.formSelector);
    form.reset();
    removeErrorMessage(popup);
    popup.classList.remove('popup_opened');
    document.removeEventListener('mousedown', closePopupOnOverlay);
    document.removeEventListener('keydown', closePopupByEsc);
};

editButton.addEventListener('click', function () {
    inputName.value = title.textContent;
    inputJob.value = subtitle.textContent;
    openPopup(popupTypeEdit);
});

addButton.addEventListener('click', function () {
    openPopup(popupTypeAdd);
});


formEdit.addEventListener('submit', function () {
    title.textContent = inputName.value;
    subtitle.textContent = inputJob.value;
    closePopup(popupTypeEdit);
});


function likeHandler(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
};

function deleteCard(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
};

function createCard(item) {

    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like');
    const deleteButton = cardElement.querySelector('.card__trash');

    cardImage.src = item.link;
    cardTitle.textContent = item.name;
    cardImage.alt = item.alt;

    cardLike.addEventListener('click', likeHandler);
    deleteButton.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', function (evt) {
        popupTypeImage.classList.add('popup_opened');
        document.addEventListener('mousedown', closePopupOnOverlay);
        document.addEventListener('keydown', closePopupByEsc);
        popupImage.src = evt.target.src;
        popupImageTitle.textContent = item.name;
    });

    return cardElement;
};

function addCard(item) {
    const cardElement = createCard(item);
    elements.prepend(cardElement);
}

initialCards.forEach(addCard);

formAdd.addEventListener('submit', function () {
    addCard({ name: imageName.value, link: imageLink.value, alt: imageName.value });
    closePopup(popupTypeAdd);
});

