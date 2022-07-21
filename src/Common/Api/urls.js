const urls = {
    LOGIN: {
        method: 'POST',
        path: 'auth/login',
    },
    LOGOUT: {
        method: 'GET',
        path: 'auth/logout',
    },
    GET_USER: {
        method: 'GET',
        path: 'auth/user',
    },
    USER_CHANGE_NAME: {
        method: 'PATCH',
        path: 'auth/user/name',
    },
    USER_CHANGE_PASSWORD: {
        method: 'PATCH',
        path: 'auth/user/password',
    },
    GET_WS_TOKEN: {
        method: 'GET',
        path: 'auth/ws-token',
    },
    SIGNUP: {
        method: 'POST',
        path: 'auth/signup',
    },
    SIGNUP_CONFIRM: {
        method: 'POST',
        path: 'auth/signup/confirm',
    },

    CREATE_SAMPLE: {
        method: 'POST',
        path: 'bank/samples',
    },
    UPDATE_SAMPLE: {
        method: 'PUT',
        path: 'bank/samples/:id',
    },
    UPLOAD_SAMPLES: {
        method: 'POST',
        path: 'bank/samples/upload',
    },
    DELETE_ALL_SAMPLES: {
        method: 'POST',
        path: 'bank/samples/all',
    },
    DELETE_SAMPLE: {
        method: 'DELETE',
        path: 'bank/samples/:id',
    },
    DELETE_SELECTED_SAMPLES: {
        method: 'POST',
        path: 'bank/samples/delete',
    },
    GET_SAMPLES: {
        method: 'GET',
        path: 'bank/samples',
    },
    SAMPLES_STATISTICS: {
        method: 'GET',
        path: 'bank/samples/statistics',
    },

    GET_SPECIES: {
        method: 'GET',
        path: 'bank/species',
    },
};

export default urls;
