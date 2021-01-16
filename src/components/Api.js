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
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
    }

    getUserInfo() {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
    }

    changeUserInfo(data) {
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
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
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
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
    }
}