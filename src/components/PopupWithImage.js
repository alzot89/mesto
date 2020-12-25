import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }


    open({ image, link }) {
        const popupImage = this._popup.querySelector('.popup__image');
        const popupImageTitle = this._popup.querySelector('.popup__image-title');
        popupImage.src = link;
        popupImageTitle.textContent = image;
        super.open();
    }
}