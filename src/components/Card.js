export class Card {
    constructor(item, myId, handleCardClick, handleCardDelete, cardSelector) {
        this._name = item.name;
        this._link = item.link;
        this._alt = item.name;
        this._ownerId = item.owner._id;
        this._myId = myId;
        this._likeAmount = item.likes.length;
        this.handleCardClick = handleCardClick;
        this.handleCardDelete = handleCardDelete;
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
        this._likeContainer = this._element.querySelector('.card__like-amount');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._setEventListeners();
        if (!(this._likeAmount === 0)) {
            this._likeContainer.textContent = this._likeAmount
        };
        if (!(this._ownerId === this._myId)) {
            this._deleteButton.classList.remove('card__trash_active')
        } else {
            this._deleteButton.classList.add('card__trash_active')
        };
        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;
        this._cardImage.alt = `картинка: ${this._alt}`;
        return this._element;
    }

    _setEventListeners() {
        const cardLike = this._element.querySelector('.card__like');
        cardLike.addEventListener('click', (evt) => {
            this._likeHandler(evt);
        });
        this._deleteButton.addEventListener('click', (evt) => {
            this.handleCardDelete(evt);
        });
        this._cardImage.addEventListener('click', () => {
            this.handleCardClick();
        });
    }

    _likeHandler(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like_active');
    }

}

