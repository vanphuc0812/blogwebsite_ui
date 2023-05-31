import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options) => {
    const response = await http.get(path, options);
    return response.data;
};

export default http;
