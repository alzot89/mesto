let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.button_type_close');
let name = popupForm.querySelector('.popup__input_type_name');
let job = popupForm.querySelector('.popup__input_type_job');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.button_type_edit');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let elements = document.querySelector('.elements__list');


function popupOpen() {
    name.value = title.textContent;
    job.value = subtitle.textContent;
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    title.textContent = name.value;
    subtitle.textContent = job.value;

    popupClose();

}


editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);

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

    elements.append(cardElement);

});





