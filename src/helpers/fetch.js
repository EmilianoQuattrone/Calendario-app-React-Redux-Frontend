const baseUrl = process.env.REACT_APP_API_URL;

const fetchConToken = (endpoint, data, method = 'GET') => {

    //Ej: http://localhost:8080/api/auth
    const url = `${baseUrl}/${endpoint}`;

    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {

        return fetch(url, {

            method,
            headers: {

                'x-token': token
            }
        });

    } else {

        return fetch(url, {

            method,
            //En el backend estoy trabajando con el formato json
            headers: {

                "Content-Type": "application/json",
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchSinToken = (endpoint, data, method = 'GET') => {

    //Ej: http://localhost:8080/api/auth
    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {

        return fetch(url);

    } else {

        return fetch(url, {

            method,
            //En el backend estoy trabajando con el formato json
            headers: {

                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    }
}

export {

    fetchSinToken,
    fetchConToken
}