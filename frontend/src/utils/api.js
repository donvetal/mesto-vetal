export class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }


    getCardList = () => this._fetch('GET', '/cards');

    getUserInfo = () => this._fetch('GET', '/users/me');

    deleteLike = (id) => this._fetch('DELETE', '/cards/likes/' + id);

    putLike = (id) => this._fetch('PUT', '/cards/likes/' + id);

    changeLikeCardStatus = (id, isLiked) => isLiked ? this.putLike(id) : this.deleteLike(id);

    deleteCard = (id) => this._fetch('DELETE', '/cards/' + id);

    setUserInfo = (name, about) => this._fetch('PATCH', '/users/me', {name, about});

    setUserAvatar = (link) => this._fetch('PATCH', '/users/me/avatar', {'avatar': link});

    addNewCard = (body) => this._fetch('POST', '/cards', body);


    _fetch(method, path, body) {
        let options = {
            method,
            headers: this.headers,
        };
        if ((method === 'PATCH' || method === 'POST') && body) {
            options = {
                ...options,
                body: JSON.stringify(body)
            };
        }
        return fetch(this.url + 'cohort-25' + path, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/',
    headers: {
        authorization: '6c5c2ad0-ab62-45ad-b6d9-d0d31ad5dd6b',
        'Content-type': 'application/json'
    }
});
export default api;


