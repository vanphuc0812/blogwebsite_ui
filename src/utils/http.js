import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options) => {
    const response = await http.get(path, options);
    return response.data;
};

export const post = async (path, data) => {
    const response = await http.post(path, data);
    return response.data;
};

export const put = async (path, body, param) => {
    const response = await http.put(path, body, param);
    return response.data;
};

export default http;
