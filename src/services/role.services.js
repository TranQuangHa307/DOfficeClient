import {get, post} from './sender';

function getAllRole() {
    return get('/api/admin/role');
}

function getAllRoleOfUser(userId) {
    return get(`/api/admin/user-role/${userId}`);
}

function addRoleForUser(data) {
    return post('/api/admin/add-role-user', data);
}


const roleServices = {
    getAllRole,
    getAllRoleOfUser,
    addRoleForUser,
}

export default roleServices;