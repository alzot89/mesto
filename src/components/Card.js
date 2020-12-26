export class Card {
    constructor({ image, link }, handleCardClick, cardSelector) {
        this._image = image;
        this._link = link;
        this._alt = image;
        this.handleCardClick = handleCardClick;
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
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._image;
        this._cardImage.alt = `картинка: ${this._alt}`;
        return this._element;
    }

    _setEventListeners() {
        const cardLike = this._element.querySelector('.card__like');
        const deleteButton = this._element.querySelector('.card__trash');
        cardLike.addEventListener('click', (evt) => {
            this._likeHandler(evt);
        });
        deleteButton.addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
        this._cardImage.addEventListener('click', () => {
            this.handleCardClick();
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
}

