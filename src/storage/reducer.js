import { SET_LOGGED_USER, REMOVE_LOGGED_USER } from './constants';
import Cookies from 'js-cookie';

function reducer(state, action) {
    switch (action.type) {
        case SET_LOGGED_USER:
            Cookies.set('loggedUser', action.payload.username, { expires: 1, path: '/', secure: true });
            Cookies.set('token', action.payload.token, { expires: 1, path: '/', secure: true });
            return { ...state, loggedUser: action.payload };
        case REMOVE_LOGGED_USER:
            Cookies.remove('loggedUser');
            Cookies.remove('token');
            return;
        // return {};
        default:
            throw new Error('Invalid action');
    }
}

export default reducer;
