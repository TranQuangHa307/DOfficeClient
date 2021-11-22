import {get} from './sender';

function getAllUser() {
    return get('/api/admin/user');
}

const userServices = {
    getAllUser,
}

export default userServices;