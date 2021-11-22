import comingDispatchServices from "../services/comingDispatch.services";

// Return ve 1 ham. Nen duoc goi la higher order function
function getAll() {
    return (dispatch) => {
        dispatch({type: 'COMING_DISPATCH_LOADING',})
        return comingDispatchServices.getAll()
            .then((result) => {
                dispatch({
                    type: 'COMING_DISPATCH_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'COMING_DISPATCH_FAILED',
                });
            })
    }
}


function getAllDocumentType() {
    return (dispatch) => {
        dispatch({type: 'DOCUMENT_TYPE_LOADING',})
        return comingDispatchServices.getAllDocumentType()
            .then((result) => {
                dispatch({
                    type: 'DOCUMENT_TYPE_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'DOCUMENT_TYPE_FAILED',
                });
            })
    }
}


function getAllStorageLocation() {
    return (dispatch) => {
        dispatch({type: 'STORAGE_LOCATION_LOADING',})
        return comingDispatchServices.getAllStorageLocation()
            .then((result) => {
                dispatch({
                    type: 'STORAGE_LOCATION_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'STORAGE_LOCATION_FAILED',
                });
            })
    }
}

const comingDispatchActions = {
    getAll,
    getAllDocumentType,
    getAllStorageLocation,
}

export default comingDispatchActions;