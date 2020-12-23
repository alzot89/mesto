export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
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
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        document.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        document.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
    }
}