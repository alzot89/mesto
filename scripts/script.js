const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

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

function removeErrorMessage(popup) {
    const errors = popup.querySelectorAll('.error');
    Array.from(errors).forEach((error) => {
        error.textContent = " ";
    });
    const inputs = popup.querySelectorAll('.popup__input');
    Array.from(inputs).forEach((input) => {
        input.classList.remove('popup__input_state_invalid');
    });
};

function formReset() {
    const forms = document.querySelectorAll('.popup__form');
    Array.from(forms).forEach((form) => {
        form.reset();
    });
};

function closePopupByEsc(evt) {
    Array.from(popups).forEach((popup) => {
        if (evt.key === 'Escape') {
            popup.classList.remove('popup_opened');
            formReset();
        };
    });
};

function closePopupOnOverlay(evt) {
    Array.from(popups).forEach((popup) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            popup.classList.remove('popup_opened');
            formReset();
        };
    });
};



function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('mousedown', closePopupOnOverlay);
    document.addEventListener('keydown', closePopupByEsc);
    enableValidation(validationConfig);
    removeErrorMessage(popup);
};



function closePopup(popup) {
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

function deleteCards(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
};

function addCards(item) {

    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like');
    const deleteButton = cardElement.querySelector('.card__trash');

    cardImage.src = item.link;
    cardTitle.textContent = item.name;
    cardImage.alt = item.alt;

    cardLike.addEventListener('click', likeHandler);
    deleteButton.addEventListener('click', deleteCards);
    cardImage.addEventListener('click', function (evt) {
        openPopup(popupTypeImage);
        popupImage.src = evt.target.src;
        popupImageTitle.textContent = item.name;
    });

    elements.prepend(cardElement);
};


initialCards.forEach(addCards);


formAdd.addEventListener('submit', function () {
    addCards({ name: imageName.value, link: imageLink.value, alt: imageName.value });
    closePopup(popupTypeAdd);
});
