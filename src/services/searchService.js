import * as http from '../Utils/http';

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
