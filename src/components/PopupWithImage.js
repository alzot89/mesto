import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    }


    open({ name, link }) {
        this._popupImage.src = link;
        this._popupImageTitle.textContent = name;
        super.open();
    }
}