import {get, post} from './sender';

function getAll() {
    return get('/api/official-dispatch/coming-dispatch');
}

function getComingDispatchById(id) {
    return get(`/api/official-dispatch/coming-dispatch/${id}`);
}

function getAllDocumentType() {
    return get('/api/official-dispatch/document-type');
}

function getAllStorageLocation() {
    return get('/api/official-dispatch/storage-location');
}

function getAllReleaseDepartment() {
    return get('/api/official-dispatch/release-department');
}

function createDispatchByForm(data) {
    return post('/api/official-dispatch/coming-dispatch', data);
}



const comingDispatchServices = {
    getAll,
    getComingDispatchById,
    getAllDocumentType,
    getAllStorageLocation,
    getAllReleaseDepartment,
    createDispatchByForm,
}

export default comingDispatchServices;