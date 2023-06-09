import { REMOVE_LOGGED_USER, SET_LOGGED_USER } from './constants';

export const setLoggedUser = (payload) => {
    return {
        type: SET_LOGGED_USER,
        payload,
    };
};

export const removeLoggedUser = () => {
    return {
        type: REMOVE_LOGGED_USER,
    };
};
