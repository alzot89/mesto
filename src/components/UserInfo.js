
export default class UserInfo {
    constructor({ titleSelector, subtitleSelector, avatarSelector }) {
        this._title = document.querySelector(titleSelector);
        this._subtitle = document.querySelector(subtitleSelector);
        this._avatar = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        const data = { name: this._title.textContent, about: this._subtitle.textContent }
        return data
    }

    setUserInfo(data) {
        this._title.textContent = data.name;
        this._subtitle.textContent = data.about;
    }

    setAvatar(data) {
        this._avatar.src = data.avatar;
    }
}