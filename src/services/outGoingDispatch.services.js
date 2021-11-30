import {del, get, post, put} from './sender';

function getAll() {
    return get('/api/official-dispatch/out-going-dispatch');
}

// function getComingDispatchById(id) {
//     return get(`/api/official-dispatch/coming-dispatch/${id}`);
// }
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
// function updateDispatchByForm(dispatchId, data) {
//     return put(`/api/official-dispatch/coming-dispatch/update/${dispatchId}`, data);
// }
//
// function getDispatchStream(dispatchId) {
//     return get(`/api/official-dispatch/get-official-dispatch-stream/${dispatchId}`);
// }
//
// function deleteComingDispatch(dispatchId) {
//     return del(`/api/official-dispatch/coming-dispatch/${dispatchId}`);
// }

const outGoingDispatchServices = {
    getAll,
    createOutGoingDispatch,
}

export default outGoingDispatchServices;