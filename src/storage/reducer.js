import { SET_LOGGED_USER } from './constants';

const initState = {
    loggedUser: {},
};

function reducer(state, action) {
    switch (action.type) {
        case SET_LOGGED_USER:
            return { ...state, loggedUser: action.payload };

        default:
            throw new Error('Invalid action');
    }
}

export { initState };
export default reducer;
