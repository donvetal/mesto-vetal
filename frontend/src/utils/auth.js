// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.vitaliymont.students.nomoredomains.club';


export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, email})
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            return res;
        });

};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, email})
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });

};

export const logout = () => {
    return fetch(`${BASE_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

export const checkAuth = () => {
    return fetch(`${BASE_URL}/check-auth`, {
        method: 'GET',
        credentials: "include",
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

