export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayAndCrossClose = this._handleOverlayAndCrossClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    _handleOverlayAndCrossClose(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('mousedown', this._handleOverlayAndCrossClose);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('mousedown', this._handleOverlayAndCrossClose);
    }
}