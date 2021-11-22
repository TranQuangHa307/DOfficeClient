import {get} from './sender';

function getAll() {
    return get('/api/official-dispatch/coming-dispatch');
}

function getAllDocumentType() {
    return get('/api/official-dispatch/document-type');
}

function getAllStorageLocation() {
    return get('/api/official-dispatch/storage-location');
}

const comingDispatchServices = {
    getAll,
    getAllDocumentType,
    getAllStorageLocation,
}

export default comingDispatchServices;