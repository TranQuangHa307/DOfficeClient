import {get, post, put} from './sender';

function getAllUser() {
    return get('/api/admin/user-info');
}

function getUserById(userId) {
    return get(`/api/admin/user/${userId}`);
}

function createUser(data) {
    return post('/api/admin/user', data);
}

function updateUser(data) {
    return put('/api/admin/user', data);
}

function activateUser(userId) {
    return post(`/api/admin/user/activate/${userId}`);
}

function deActivateUser(userId) {
    return post(`/api/admin/user/deactivate/${userId}`);
}

function changePassword(data) {
    return post('/api/admin/user/change-password', data);
}

const userServices = {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    activateUser,
    deActivateUser,
    changePassword,
}

export default userServices;