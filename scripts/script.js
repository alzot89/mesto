let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.button_type_close');
let saveButton = popup.querySelector('.button_type_save');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.button_type_edit');


function popupOpen() {
    popup.classList.add('popup_opened');
    let name = popupForm.querySelector('.popup__name');
    let job = popupForm.querySelector('.popup__job');
    let title = profile.querySelector('.profile__title');
    let subtitle = profile.querySelector('.profile__subtitle');

    name.value = title.textContent;
    job.value = subtitle.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);


let popupForm = popup.querySelector('.popup__form');

function formSubmitHandler(evt) {
    evt.preventDefault();

    let name = popupForm.querySelector('.popup__name');
    let job = popupForm.querySelector('.popup__job');

    name.value;
    job.value;

    let title = profile.querySelector('.profile__title');
    let subtitle = profile.querySelector('.profile__subtitle');

    title.textContent = `${name.value}`;
    subtitle.textContent = `${job.value}`;

    popupClose();

}



popupForm.addEventListener('submit', formSubmitHandler);





