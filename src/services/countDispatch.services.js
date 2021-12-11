import {get} from './sender';

function getCountDispatch() {
    return get('/api/official-dispatch/get-count-dispatch');
}

const countDispatchServices = {
    getCountDispatch,
}

export default countDispatchServices;