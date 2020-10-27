let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.button_type_close');
let name = popupForm.querySelector('.popup__input_type_name');
let job = popupForm.querySelector('.popup__input_type_job');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.button_type_edit');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');


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





