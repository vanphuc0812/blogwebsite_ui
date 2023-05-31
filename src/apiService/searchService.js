import * as http from '../Utils/http';

export const search = async (keyword, type = 'less') => {
    try {
        const res = await http.get('BlogsManagement/SearchBlogs', {
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
