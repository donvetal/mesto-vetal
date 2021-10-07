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
    // .then(res => res.json())
    // .then((data) => {
    //
    //     if (data.token) {
    //         return data;
    //     }
    // });

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

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`

        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

// export const checkToken = () => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//             // "Authorization": `Bearer ${token}`
//
//         }
//     })
//         .then(res => res.json())
//         .then(data => data);
// };
