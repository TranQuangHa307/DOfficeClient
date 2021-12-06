import {get, post} from './sender';

function getAllUser() {
    return get('/api/admin/user-info');
}

function getUserById(userId) {
    return get(`/api/admin/user/${userId}`);
}

function createUser(data) {
    return post('/api/admin/user', data);
}

const userServices = {
    getAllUser,
    createUser,
    getUserById,
}

export default userServices;