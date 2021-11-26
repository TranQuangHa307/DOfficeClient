import { get } from './sender';

function getAll() {
    return get('/api/document/')
}

const documentServices = {
    getAll,
}

export default documentServices;