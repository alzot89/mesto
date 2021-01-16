
export default class UserInfo {
    constructor({ titleSelector, subtitleSelector }) {
        this._title = document.querySelector(titleSelector);
        this._subtitle = document.querySelector(subtitleSelector)
    }

    getUserInfo() {
        const data = { name: this._title.textContent, about: this._subtitle.textContent }
        return data
    }

    setUserInfo(data) {
        this._title.textContent = data.name;
        this._subtitle.textContent = data.about;
    }
}