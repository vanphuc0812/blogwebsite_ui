import { useReducer } from 'react';
import Cookies from 'js-cookie';
import Context from './context';
import reducer from './reducer';

function Provider({ children }) {
    const initState = {
        loggedUser: Cookies.get('loggedUser'),
        token: Cookies.get('token'),
    };

    const [state, dispatch] = useReducer(reducer, initState);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default Provider;
