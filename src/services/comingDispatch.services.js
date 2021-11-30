import {del, get, post, put} from './sender';

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

function updateDispatchByForm(dispatchId, data) {
    return put(`/api/official-dispatch/coming-dispatch/update/${dispatchId}`, data);
}

function getDispatchStream(dispatchId) {
    return get(`/api/official-dispatch/get-official-dispatch-stream/${dispatchId}`);
}

function deleteComingDispatch(dispatchId) {
    return del(`/api/official-dispatch/coming-dispatch/${dispatchId}`);
}

function forward(data) {
    return post(`/api/official-dispatch/coming-dispatch/forward`, data);
}

function approve(dispatchId) {
    return get(`/api/official-dispatch/coming-dispatch/approve/${dispatchId}`);
}

function getUserViewDispatch(dispatchId) {
    return get(`/api/official-dispatch/user-view-dispatch/${dispatchId}`);
}

const comingDispatchServices = {
    getAll,
    getComingDispatchById,
    getAllDocumentType,
    getAllStorageLocation,
    getAllReleaseDepartment,
    createDispatchByForm,
    getDispatchStream,
    updateDispatchByForm,
    deleteComingDispatch,
    forward,
    approve,
    getUserViewDispatch,
}

export default comingDispatchServices;