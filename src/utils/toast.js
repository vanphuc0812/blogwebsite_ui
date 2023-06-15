import { toast } from 'react-toastify';

const option = {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose: 2000,
};
export const error = (errorMessage) => toast.error(errorMessage, option);

export const noLogin = () => toast.error('You must login first', option);
