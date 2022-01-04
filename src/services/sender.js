import axios from'axios';
import Cookie from 'js-cookie';

const ROUTE_PATH = 'http://54.169.166.121/do-backend'; // services fake

const getAuthToken = () => Cookie.get('authToken');

const handleResponse = (res) => {

    if(res.data.message) {
        return res.data;
    }

    return new Promise((resolve, reject) => {
        if(res.status === 200) {
            if(res.data) {
                if (!res.data.success) {
                    return reject(new Error(res.data.message));
                }
                return resolve(res.data);
            }
        }
        return reject(new Error('Unknown Error'));
    });
};

const handleError = (error) => {
    return new Promise((resolve, reject) => {
        if (error.response && error.response.data) {
            return reject(error.response.data.message);
        }

        return reject(error);
    });
};

export const get = (endpoint, params) => {
    return axios
        .get(
            `${ROUTE_PATH}${endpoint}`,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            })
        .then(handleResponse)
        .catch(handleError);
};

export const post = (endpoint, data) => {
    return axios.post(`${ROUTE_PATH}${endpoint}`, data, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    }).then(handleResponse).catch(handleError);
};

export const put = (endpoint, data) => {
    return axios.put(`${ROUTE_PATH}${endpoint}`, data, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    }).then(handleResponse).catch(handleError);
};

export const del = (endpoint, params) => {
    return axios
        .delete(
            `${ROUTE_PATH}${endpoint}`,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            })
        .then(handleResponse)
        .catch(handleError);
};