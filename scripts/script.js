const popupTypeEdit = document.querySelector('#edit');
const popupTypeAdd = document.querySelector('#add');
const popupTypeImage = document.querySelector('#image');


const popupForm = popupTypeEdit.querySelector('.popup__form');
const closeButton = popupTypeEdit.querySelector('.popup__close');
const addPreviewPopupForm = popupTypeAdd.querySelector('.popup__form');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');

const inputName = popupForm.querySelector('.popup__input_type_name');
const inputJob = popupForm.querySelector('.popup__input_type_job');

const imageName = addPreviewPopupForm.querySelector('.popup__input_type_image');
const imageLink = addPreviewPopupForm.querySelector('.popup__input_type_link');


const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.button_type_edit');
const addButton = profile.querySelector('.button_type_add');
const title = profile.querySelector('.profile__title');
const subtitle = profile.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#template-card').content;

function openPopup(somePopup) {
    somePopup.classList.add('popup_opened');
};

function closePopup(somePopup) {
    somePopup.classList.remove('popup_opened');
}


editButton.addEventListener('click', function () {
    inputName.value = title.textContent;
    inputJob.value = subtitle.textContent;
    openPopup(popupTypeEdit);
});

addButton.addEventListener('click', function () {
    openPopup(popupTypeAdd);
});

document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('button')) {
        closePopup(evt.target.closest('.popup'));
    }
});

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        closePopup(popupTypeEdit);
    };
});

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        closePopup(popupTypeAdd);
    };
});

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        closePopup(popupTypeImage);
    };
})

/*popupTypeEdit.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupTypeEdit);
    };
});
popupTypeAdd.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupTypeAdd);
    };
});
popupTypeImage.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupTypeImage);
    };
});*/

document.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target.closest('.popup'));
    };
});

popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
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

function addInitialCards(item) {

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


initialCards.forEach(addInitialCards);

function addNewCards(evt) {
    evt.preventDefault();
    addInitialCards({ name: imageName.value, link: imageLink.value, alt: imageName.value });
    closePopup(popupTypeAdd);
};


addPreviewPopupForm.addEventListener('submit', addNewCards);
