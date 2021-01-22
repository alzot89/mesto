export default class Api {
    constructor({ address, token, groupId }) {
        this._address = address;
        this._token = token;
        this._groupId = groupId;
    }

    getCardsData() {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                return this._checkResponseStatus(res)
            })
    }

    getUserData() {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                return this._checkResponseStatus(res)
            })
    }

    changeUserData(data) {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then((res) => {
                return this._checkResponseStatus(res)
            })
    }

    changeAvatar(data) {
        return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then((res) => {
                return this._checkResponseStatus(res)
            })
    }

    setCardData(data) {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => {
                return this._checkResponseStatus(res)
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                return this._checkResponseStatus(res)
            })
    }

    putLike(cardId) {
        return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return this._checkResponseStatus(res)
            })
    }

    deleteLike(cardId) {
        return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return this._checkResponseStatus(res)
            })
    }

    _checkResponseStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`)
    }
}