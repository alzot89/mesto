export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
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

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close');
        closeButton.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('mousedown', this._handleOverlayClose);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('mousedown', this._handleOverlayClose);
    }
}