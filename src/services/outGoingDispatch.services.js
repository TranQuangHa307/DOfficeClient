import {del, get, post, put} from './sender';

function getAll() {
    return get('/api/official-dispatch/out-going-dispatch');
}

function getOutGoingDispatchById(id) {
    return get(`/api/official-dispatch/out-going-dispatch/${id}`);
}
//
// function getAllDocumentType() {
//     return get('/api/official-dispatch/document-type');
// }
//
// function getAllStorageLocation() {
//     return get('/api/official-dispatch/storage-location');
// }
//
// function getAllReleaseDepartment() {
//     return get('/api/official-dispatch/release-department');
// }
//
function createOutGoingDispatch(data) {
    return post('/api/official-dispatch/out-going-dispatch', data);
}
//
function updateDispatchByForm(dispatchId, data) {
    return put(`/api/official-dispatch/out-going-dispatch/update/${dispatchId}`, data);
}
//
// function getDispatchStream(dispatchId) {
//     return get(`/api/official-dispatch/get-official-dispatch-stream/${dispatchId}`);
// }
//
function deleteOutGoingDispatch(dispatchId) {
    return del(`/api/official-dispatch/out-going-dispatch/${dispatchId}`);
}

function submitToUnitLeadership(data) {
    return post('/api/official-dispatch/out-going-dispatch/submit-to-unit-leadership', data);
}

function sign(data) {
    return post('/api/official-dispatch/out-going-dispatch/sign', data);
}

function reject(data) {
    return post('/api/official-dispatch/out-going-dispatch/reject', data);
}

// Cấp số
function generateDispatchNumber(dispatchId) {
    return post(`/api/official-dispatch/out-going-dispatch/generate-dispatch-number/${dispatchId}`);
}

// Xuất bản
function publish(dispatchId) {
    return post(`/api/official-dispatch/out-going-dispatch/publish-dispatch/${dispatchId}`);
}

// Lưu trữ
function archive(dispatchId) {
    return post(`/api/official-dispatch/out-going-dispatch/archive/${dispatchId}`);
}

function getPublishedDispatch(id) {
    return get(`/api/official-dispatch/out-going-dispatch/published-dispatch/${id}`);
}

const outGoingDispatchServices = {
    getAll,
    createOutGoingDispatch,
    getOutGoingDispatchById,
    submitToUnitLeadership,
    updateDispatchByForm,
    deleteOutGoingDispatch,
    sign,
    reject,
    generateDispatchNumber,
    publish,
    archive,
    getPublishedDispatch,
}

export default outGoingDispatchServices;