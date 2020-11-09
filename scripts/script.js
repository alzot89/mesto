const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');


const popupForm = popupTypeEdit.querySelector('.popup__form');
const closeButton = popupTypeEdit.querySelector('.popup__close-button');
const secondPopupForm = popupTypeAdd.querySelector('.popup__form');
const secondCloseButton = popupTypeAdd.querySelector('.popup__close-button');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');
const thirdCloseButton = popupTypeImage.querySelector('.popup__close-button');

const name = popupForm.querySelector('.popup__input_type_name');
const job = popupForm.querySelector('.popup__input_type_job');

const image = secondPopupForm.querySelector('.popup__input_type_image');
const link = secondPopupForm.querySelector('.popup__input_type_link');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.button_type_edit');
const addButton = profile.querySelector('.button_type_add');
const title = profile.querySelector('.profile__title');
const subtitle = profile.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements__list');

editButton.addEventListener('click', function () {
    name.value = title.textContent;
    job.value = subtitle.textContent;
    popupTypeEdit.classList.add('popup_opened');
});

addButton.addEventListener('click', function () {
    popupTypeAdd.classList.add('popup_opened');
});

closeButton.addEventListener('click', function () {
    popupTypeEdit.classList.remove('popup_opened');
});

secondCloseButton.addEventListener('click', function () {
    popupTypeAdd.classList.remove('popup_opened');
});

thirdCloseButton.addEventListener('click', function () {
    popupTypeImage.classList.remove('popup_opened');
});

popupTypeEdit.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
        popupTypeEdit.classList.remove('popup_opened');
    };
});

popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    title.textContent = name.value;
    subtitle.textContent = job.value;
    popupTypeEdit.classList.remove('popup_opened');
});

const initialCards = [
    {
        name: 'Барселона',
        link: './images/Barselona.jpg',
        alt: 'картинка: Барселона'
    },
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
    }
];



initialCards.forEach(function (item) {

    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').alt = item.alt;

    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like_active');
    });

    const deleteButton = cardElement.querySelector('.card__trash');
    deleteButton.addEventListener('click', function () {
        const card = deleteButton.closest('.card');
        card.remove();
    });

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', function (evt) {
        popupTypeImage.classList.add('popup_opened');
        popupImage.src = evt.target.src;
        popupImageTitle.textContent = item.name;
    });

    elements.append(cardElement);

});


secondPopupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = link.value;
    cardElement.querySelector('.card__title').textContent = image.value;
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like_active');
    });
    const deleteButton = cardElement.querySelector('.card__trash');
    deleteButton.addEventListener('click', function () {
        const card = deleteButton.closest('.card');
        card.remove();
    });

    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        popupTypeImage.classList.add('popup_opened');
        popupImage.src = evt.target.src;
        popupImageTitle.textContent = image.value;
    });

    elements.prepend(cardElement);
    popupTypeAdd.classList.remove('popup_opened');
});

