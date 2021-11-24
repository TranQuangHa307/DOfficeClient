import {get} from './sender';

function getAllUser() {
    return get('/api/admin/user-info');
}

const userServices = {
    getAllUser,
}

export default userServices;