const popupTypeEdit = document.querySelector('#edit');
const popupTypeAdd = document.querySelector('#add');
const popupTypeImage = document.querySelector('#image');
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
};

function removeErrorMessage() {
    const errors = document.querySelectorAll('.error');
    Array.from(errors).forEach((error) => {
        error.textContent = " ";
    });
    const inputsList = document.querySelectorAll('.popup__input');
    Array.from(inputsList).forEach((input) => {
        input.classList.remove('popup__input_state_invalid');
    });
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeErrorMessage();
};

inputName.value = title.textContent;
inputJob.value = subtitle.textContent;
editButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
});

addButton.addEventListener('click', function () {
    openPopup(popupTypeAdd);
});


document.addEventListener('keydown', function (evt) {
    Array.from(popups).forEach((popup) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        };
    });
});

document.addEventListener('mousedown', function (evt) {
    Array.from(popups).forEach((popup) => {
        if (evt.target.classList.contains('button') || evt.target.classList.contains('popup')) {
            closePopup(popup);
        };
    });
});


formEdit.addEventListener('submit', function () {
    title.textContent = inputName.value;
    subtitle.textContent = inputJob.value;
    closePopup(popupTypeEdit);
});

const initialCards = [
    {
        name: 'Порту',
        link: './images/Porto.jpg',
        alt: 'картинка: Порту'
    },
    {
        name: 'Lez Arc Франция',
        link: './images/Lez-Ark.jpg',
        alt: 'картинка: Lez Arc Франция'
    },
    {
        name: 'Шри-Ланка',
        link: './images/Shri-Lanka.jpg',
        alt: 'картинка: Шри-Ланка'
    },
    {
        name: 'Бали',
        link: './images/Bali.jpg',
        alt: 'картинка: Бали'
    },
    {
        name: 'Копенгаген',
        link: './images/Copenhagen.JPG',
        alt: 'картинка: Копенгаген'
    },
    {
        name: 'Барселона',
        link: './images/Barselona.jpg',
        alt: 'картинка: Барселона'
    }
];



function cardsLike(evt) {
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

    cardLike.addEventListener('click', cardsLike);
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
