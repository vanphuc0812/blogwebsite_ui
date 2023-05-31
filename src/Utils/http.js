import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/',
});

export const get = async (path, options) => {
    const response = await http.get(path, options);
    return response.data;
};

export default http;
