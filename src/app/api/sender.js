import axios from'axios';

const ROUTE_PATH = 'https://6173bb4d110a7400172230e6.mockapi.io'; // api fake

const handleResponse = (res) => {

    if(res.data.message) {
        return res.data;
    }

    return new Promise((resolve, reject) => {
        if(res.status === 200) {
            if(res.data) {
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
    return axios.get(`${ROUTE_PATH}${endpoint}`, {params}).then(handleResponse).catch(handleError);
};

export const post = (endpoint, data) => {
    return axios.post(`${ROUTE_PATH}${endpoint}`, data).then(handleResponse).catch(handleError);
};
