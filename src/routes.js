const routes = {
    LOGIN: '/',
    SIGNUP: '/signup',
    SIGNUP_CONFIRM: '/signup/confirm',
    RESET_PASSWORD: '/password/reset',
    RESET_PASSWORD_CONFIRM: '/password/reset/confirm',

    SAMPLES_MAP: '/samples/:type/:id/map',
    SAMPLES_CREATE: '/samples/:type/create',
    SAMPLES_DELETE: '/samples/:type/:id/delete',
    SAMPLES_EDIT: '/samples/:type/:id/edit',
    BANK: '/samples/:type/:page',

    SPECIES: '/species',
    SPECIES_MAP: '/species/:id/map',
    SPECIES_CREATE: '/species/create',
    SPECIES_DELETE: '/species/:id/delete',
    SPECIES_EDIT: '/species/:id/edit',
};

export default routes;
