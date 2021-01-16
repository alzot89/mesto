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
}