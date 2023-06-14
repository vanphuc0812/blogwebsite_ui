import { useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import Context from './context';
import reducer from './reducer';
import { action } from '.';
import * as apiService from '../services/apiService';
import config from '../config';

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, {});

    useEffect(() => {
        const fetchAPI = async () => {
            const user = await apiService.fetch(config.path.GET_USER_BY_USERNAME, {
                params: {
                    username: Cookies.get('loggedUser'),
                },
            });
            dispatch(action.setLoggedUser(user));
        };

        if (typeof Cookies.get('loggedUser') !== 'undefined') fetchAPI();
    }, []);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default Provider;
