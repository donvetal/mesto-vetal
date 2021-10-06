// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.vitaliymont.students.nomoredomains.club';


export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
            'Accept': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(res => res.json())
        .then((data) => {

            if (data.token) {
                return data;
            }
        });

};


export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        }
    })
        .then(res => res.json())
        .then(data => data);
};
