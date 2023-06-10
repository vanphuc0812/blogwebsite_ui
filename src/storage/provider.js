import { useReducer, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Context from './context';
import reducer from './reducer';
import * as apiService from '../services/apiService';
import config from '../config';

function Provider({ children }) {
    const [initState, setInitState] = useState({});
    useEffect(() => {
        const fetchAPI = async () => {
            const user = await apiService.fetch(config.path.GET_USER_BY_USERNAME, {
                params: {
                    username: Cookies.get('loggedUser'),
                },
            });
            setInitState({
                loggedUser: { ...user },
            });
        };

        if (typeof Cookies.get('loggedUser') !== 'undefined') fetchAPI();
    }, []);

    const [state, dispatch] = useReducer(reducer, initState);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default Provider;
