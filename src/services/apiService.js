import * as http from '../utils/http';
import config from '../config';

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

export const fetch = async (path, param) => {
    try {
        const res = await http.get(path, param);
        return res.content;
    } catch (error) {
        return error.response.data;
    }
};
export const deleteAPI = async (path, param) => {
    try {
        const res = await http.deleteHttp(path, param);
        return res.content;
    } catch (error) {
        return error.response.data;
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

export const followUser = async (rootUser, followedUser) => {
    try {
        const res = await http.put(config.path.FOLLOW_USER, null, {
            params: { rootUser, followedUser },
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const unfollowUser = async (rootUser, unfollowedUser) => {
    try {
        const res = await http.put(config.path.UNFOLLOW_USER, null, {
            params: { rootUser, unfollowedUser },
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
