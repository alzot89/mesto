import Popup from './Popup.js'

export default class PopupConfirm extends Popup {
    constructor(confirmHandler, popupSelector) {
        super(popupSelector);
        this._confirmHandler = confirmHandler;
        this._form = this._popup.querySelector('.popup__form')
    }

    open(data, card) {
        super.open();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._confirmHandler(data, card);
        });
    }
}
