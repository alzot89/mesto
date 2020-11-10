const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');


const popupForm = popupTypeEdit.querySelector('.popup__form');
const closeButton = popupTypeEdit.querySelector('.popup__close');
const addPreviewPopupForm = popupTypeAdd.querySelector('.popup__form');
const addPreviewCloseButton = popupTypeAdd.querySelector('.popup__close');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');
const imagePreviewCloseButton = popupTypeImage.querySelector('.popup__close');

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

function openEditPopup() {
    popupTypeEdit.classList.add('popup_opened');
};

function openAddPopup() {
    popupTypeAdd.classList.add('popup_opened');
};

function imagePreview() {
    popupTypeImage.classList.add('popup_opened');
};

function closeEditPopup() {
    popupTypeEdit.classList.remove('popup_opened');
};

function closeAddPopup() {
    popupTypeAdd.classList.remove('popup_opened');
};

function closeImagePreview() {
    popupTypeImage.classList.remove('popup_opened');
};


editButton.addEventListener('click', function () {
    inputName.value = title.textContent;
    inputJob.value = subtitle.textContent;
    openEditPopup();
});

addButton.addEventListener('click', openAddPopup);
closeButton.addEventListener('click', closeEditPopup);
addPreviewCloseButton.addEventListener('click', closeAddPopup);
imagePreviewCloseButton.addEventListener('click', closeImagePreview);

popupTypeEdit.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closeEditPopup();
    };
});

popupTypeImage.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closeImagePreview();
    };
});

popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    title.textContent = inputName.value;
    subtitle.textContent = inputJob.value;
    closeAddPopup();
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



function cardsLike(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
};




initialCards.forEach(function (item) {

    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like');
    const deleteButton = cardElement.querySelector('.card__trash');

    cardImage.src = item.link;
    cardTitle.textContent = item.name;
    cardImage.alt = item.alt;

    cardLike.addEventListener('click', cardsLike);

    function deleteCards() {
        const card = deleteButton.closest('.card');
        card.remove();
    };

    deleteButton.addEventListener('click', deleteCards);

    cardImage.addEventListener('click', function (evt) {
        imagePreview();
        popupImage.src = evt.target.src;
        popupImageTitle.textContent = item.name;
    });

    elements.append(cardElement);

});



addPreviewPopupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like');
    const deleteButton = cardElement.querySelector('.card__trash');

    cardImage.src = imageLink.value;
    cardTitle.textContent = imageName.value;
    cardImage.alt = `картинка: ${imageName.value}`;


    cardLike.addEventListener('click', cardsLike);

    function deleteCards() {
        const card = deleteButton.closest('.card');
        card.remove();
    };

    deleteButton.addEventListener('click', deleteCards);

    cardImage.addEventListener('click', function (evt) {
        imagePreview();
        popupImage.src = evt.target.src;
        popupImageTitle.textContent = imageName.value;
    });

    elements.prepend(cardElement);
    closeAddPopup();
});

