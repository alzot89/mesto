import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({ name, link, alt }, popupSelector) {
        super(popupSelector);
        this._name = name;
        this._link = link;
        this._alt = alt;
    }


    open() {
        const popupImage = this._popup.querySelector('.popup__image');
        const popupImageTitle = this._popup.querySelector('.popup__image-title');
        popupImage.src = this._link;
        popupImageTitle.textContent = this._name;
        popupImage.alt = this._alt;
        super.open();
    }
}