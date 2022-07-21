import isJsonResponse from './isJsonResponse';

function req(url, method, data) {
    const isFormData = data instanceof FormData;

    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        // 'X-Client-Id': user ? user.clientId : null,
    };

    if (isFormData) {
        delete headers['Content-Type']; // https://stackoverflow.com/a/39281156
    }

    let body;
    if (!data) {
        body = undefined;
    } else if (isFormData) {
        body = data;
    } else {
        body = JSON.stringify(data);
    }

    return fetch(`/api/v1/${url}`, {
        method,
        body,
        headers,
    })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            throw response;
        })
        .then((response) => {
            if (isJsonResponse(response)) {
                return response.json();
            }
            return response.text();
        });
}

export default req;
