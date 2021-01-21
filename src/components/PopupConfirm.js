import Popup from './Popup.js'

export default class PopupConfirm extends Popup {
    constructor(confirmHandler, popupSelector) {
        super(popupSelector);
        this._confirmHandler = confirmHandler;
        this._form = this._popup.querySelector('.popup__form')
    }

    open(data, evt) {
        super.open();
        this._form.addEventListener('submit', () => {
            this._confirmHandler(data);
            evt.target.closest('.card').remove();
        });
    }
}
