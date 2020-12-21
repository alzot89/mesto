import { openPopup, popupTypeImage, popupImage, popupImageTitle } from './script.js';
export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._cardSelector = cardSelector;
    }

    _createCard() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);
        return cardElement;
    }

    getCard() {
        this._element = this._createCard();
        const cardImage = this._element.querySelector('.card__image');
        const cardTitle = this._element.querySelector('.card__title');
        this._setEventListeners();
        cardImage.src = this._link;
        cardTitle.textContent = this._name;
        cardImage.alt = this._alt;
        return this._element;
    }

    _setEventListeners() {
        const cardLike = this._element.querySelector('.card__like');
        const deleteButton = this._element.querySelector('.card__trash');
        const cardImage = this._element.querySelector('.card__image');
        cardLike.addEventListener('click', (evt) => {
            this._likeHandler(evt);
        });
        deleteButton.addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
        cardImage.addEventListener('click', () => {
            this._popupTypeImageHandler();
        });
    }

    _likeHandler(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like_active');
    }

    _deleteCard(evt) {
        const eventTarget = evt.target;
        eventTarget.closest('.card').remove();
    }

    _popupTypeImageHandler() {
        openPopup(popupTypeImage);
        popupImage.src = this._link;
        popupImageTitle.textContent = this._name;
        popupImage.alt = this._alt;
    }
}

