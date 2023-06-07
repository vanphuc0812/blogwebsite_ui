import { SET_LOGGED_USER } from './constants';

export const setLoggedUser = (payload) => {
    return {
        type: SET_LOGGED_USER,
        payload,
    };
};
