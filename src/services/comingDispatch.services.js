import { get } from './sender';

function getAll(){
    return get('/api/official-dispatch/coming-dispatch');
}


const comingDispatchServices = {
    getAll,
}

export default comingDispatchServices;