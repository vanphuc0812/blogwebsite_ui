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
        console.log(error);
    }
};

export const postJson = async (path, data) => {
    try {
        const res = await http.post(path, data);
        return res.content;
    } catch (error) {
        console.log(error);
    }
};
