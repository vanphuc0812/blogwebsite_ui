import { useContext } from 'react';
<<<<<<< HEAD
import { StoreContext } from '.';
=======
import StoreContext from './context';
>>>>>>> 965044c0b41feae925034fecd3c9acd30e9e0eb6

export const useStore = () => {
    const [state, dispatch] = useContext(StoreContext);
    return [state, dispatch];
};
