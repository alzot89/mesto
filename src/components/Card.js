export class Card {
    constructor(item, myId, handleCardClick, handleCardDelete, handleCardLike, cardSelector) {
        this._name = item.name;
        this._link = item.link;
        this._alt = item.name;
        this._ownerId = item.owner._id;
        this._myId = myId;
        this._likesData = item.likes;
        this._likeAmount = item.likes.length;
        this.handleCardClick = handleCardClick;
        this.handleCardDelete = handleCardDelete;
        this.handleCardLike = handleCardLike;
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
        this._cardLike = this._element.querySelector('.card__like');
        if (!(this._likeAmount === 0)) {
            this._likeContainer.textContent = this._likeAmount
        };
        if (this._ownerId === this._myId) {
            this._deleteButton.classList.add('card__trash_active')
        };
        if (this._likesData.some((element) => {
            return element._id === this._myId
        })) {
            this._cardLike.classList.add('card__like_active')
        };
        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;
        this._cardImage.alt = `картинка: ${this._alt}`;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', (evt) => {
            this.handleCardLike(evt);
        });
        this._deleteButton.addEventListener('click', (evt) => {
            this.handleCardDelete(evt);
        });
        this._cardImage.addEventListener('click', () => {
            this.handleCardClick();
        });
    }

    changeLikesAmount(data) {
        if (!(data.likes.length === 0)) {
            this._likeContainer.textContent = data.likes.length;
        } else {
            this._likeContainer.textContent = ""
        }
    }

    checkLikeStatus() {
        if (!this._cardLike.classList.contains('card__like_active')) {
            return true
        }
    }

    switchLikeStatus() {
        this._cardLike.classList.toggle('card__like_active')
    }

}

