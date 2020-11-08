let popupEditType = document.querySelector('.popup_type_edit');
let popupAddType = document.querySelector('.popup_type_add');
let popupImageType = document.querySelector('.popup_type_image');


let popupForm = popupEditType.querySelector('.popup__form');
let closeButton = popupEditType.querySelector('.popup__close-button');
let secondPopupForm = popupAddType.querySelector('.popup__form');
let secondCloseButton = popupAddType.querySelector('.popup__close-button');

let popupImage = popupImageType.querySelector('.popup__image');
let popupImageTitle = popupImageType.querySelector('.popup__image-title');
let thirdCloseButton = popupImageType.querySelector('.popup__close-button');

let name = popupForm.querySelector('.popup__input_type_name');
let job = popupForm.querySelector('.popup__input_type_job');

let image = secondPopupForm.querySelector('.popup__input_type_image');
let link = secondPopupForm.querySelector('.popup__input_type_link');

let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.button_type_edit');
let addButton = profile.querySelector('.button_type_add');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let elements = document.querySelector('.elements__list');

editButton.addEventListener('click', function () {
    name.value = title.textContent;
    job.value = subtitle.textContent;
    popupEditType.classList.add('popup_opened');
});

addButton.addEventListener('click', function () {
    popupAddType.classList.add('popup_opened');
});

closeButton.addEventListener('click', function () {
    popupEditType.classList.remove('popup_opened');
});

secondCloseButton.addEventListener('click', function () {
    popupAddType.classList.remove('popup_opened');
});

thirdCloseButton.addEventListener('click', function () {
    popupImageType.classList.remove('popup_opened');
});

popupEditType.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
        popupEditType.classList.remove('popup_opened');
    };
});

popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    title.textContent = name.value;
    subtitle.textContent = job.value;
    popupEditType.classList.remove('popup_opened');
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
        popupImageType.classList.add('popup_opened');
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
        popupImageType.classList.add('popup_opened');
        popupImage.src = evt.target.src;
        popupImageTitle.textContent = image.value;
    });

    elements.prepend(cardElement);
    popupAddType.classList.remove('popup_opened');
});

