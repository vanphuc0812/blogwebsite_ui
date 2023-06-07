import * as http from '../utils/http';

export const search = async (path, keyword, type = 'less') => {
    try {
        const res = await http.get(path, {
            params: {
                keyword: keyword,
                type: type,
            },
        });
        return res.content;
    } catch (error) {
        console.log(error);
    }
};

export const fetchAll = async (path) => {
    try {
        const res = await http.get(path);
        return res.content;
    } catch (error) {
        return error.response.data;
    }
};

export const postJson = async (path, data) => {
    try {
        const res = await http.post(path, data);
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
