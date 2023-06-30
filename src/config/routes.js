const routes = {
    home: '/',
    blog: '/blog/:transliterated/:id',
    edit: '/blog/edit/:transliterated/:id',
    blogger: '/blogger/:username',
    search: '/search',
    write: '/write',
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgotPassword',
};

export default routes;
