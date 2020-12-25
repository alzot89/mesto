
export default class UserInfo {
    constructor({ titleSelector, subtitleSelector }) {
        this._title = document.querySelector(titleSelector);
        this._subtitle = document.querySelector(subtitleSelector)
    }

    getUserInfo() {
        const data = { name: this._title.textContent, job: this._subtitle.textContent }
        return data
    }

    setUserInfo({ name, job }) {
        this._title.textContent = name;
        this._subtitle.textContent = job;
    }
}