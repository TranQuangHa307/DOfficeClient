import outGoingDispatchServices from "../services/outGoingDispatch.services";

// Return ve 1 ham. Nen duoc goi la higher order function
function getAll() {
    return (dispatch) => {
        dispatch({type: 'OUT_GOING_DISPATCH_LOADING',})
        return outGoingDispatchServices.getAll()
            .then((result) => {
                dispatch({
                    type: 'OUT_GOING_DISPATCH_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'OUT_GOING_DISPATCH_FAILED',
                });
            })
    }
}

// function getComingDispatchById(id) {
//     return (dispatch) => {
//         dispatch({type: 'COMING_DISPATCH_DETAIL_LOADING',})
//         return comingDispatchServices.getComingDispatchById(id)
//             .then((result) => {
//                 dispatch({
//                     type: 'COMING_DISPATCH_DETAIL_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 dispatch({
//                     type: 'COMING_DISPATCH_DETAIL_FAILED',
//                 });
//             })
//     }
// }
//
// function getEditingComingDispatchById(id) {
//     return (dispatch) => {
//         dispatch({type: 'EDITING_COMING_DISPATCH_LOADING',})
//         return comingDispatchServices.getComingDispatchById(id)
//             .then((result) => {
//                 dispatch({
//                     type: 'EDITING_COMING_DISPATCH_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 dispatch({
//                     type: 'EDITING_COMING_DISPATCH_FAILED',
//                 });
//             })
//     }
// }
//
//
// function getAllDocumentType() {
//     return (dispatch) => {
//         dispatch({type: 'DOCUMENT_TYPE_LOADING',})
//         return comingDispatchServices.getAllDocumentType()
//             .then((result) => {
//                 dispatch({
//                     type: 'DOCUMENT_TYPE_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 console.log(err);
//                 dispatch({
//                     type: 'DOCUMENT_TYPE_FAILED',
//                 });
//             })
//     }
// }
//
//
// function getAllStorageLocation() {
//     return (dispatch) => {
//         dispatch({type: 'STORAGE_LOCATION_LOADING',})
//         return comingDispatchServices.getAllStorageLocation()
//             .then((result) => {
//                 dispatch({
//                     type: 'STORAGE_LOCATION_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 console.log(err);
//                 dispatch({
//                     type: 'STORAGE_LOCATION_FAILED',
//                 });
//             })
//     }
// }
//
// function getAllReleaseDepartment() {
//     return (dispatch) => {
//         dispatch({type: 'RELEASE_DEPARTMENT_LOADING',})
//         return comingDispatchServices.getAllReleaseDepartment()
//             .then((result) => {
//                 dispatch({
//                     type: 'RELEASE_DEPARTMENT_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 console.log(err);
//                 dispatch({
//                     type: 'RELEASE_DEPARTMENT_FAILED',
//                 });
//             })
//     }
// }
//
function createOutGoingDispatch(data) {
    return () => {
        return outGoingDispatchServices.createOutGoingDispatch(data)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}
//
// function updateDispatchByForm(dispatchId, data) {
//     return () => {
//         return comingDispatchServices.updateDispatchByForm(dispatchId, data)
//             .then((result) => {
//                 if (result.code >= 400 && result.code <= 599) {
//                     throw new Error(result.message);
//                 }
//                 return result.data;
//             })
//     }
// }
//
// function getDispatchStream(dispatchId) {
//     return (dispatch) => {
//         dispatch({type: 'ACTIVITY_HISTORY_LOADING',})
//         return comingDispatchServices.getDispatchStream(dispatchId)
//             .then((result) => {
//                 dispatch({
//                     type: 'ACTIVITY_HISTORY_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 console.log(err);
//                 dispatch({
//                     type: 'ACTIVITY_HISTORY_FAILED',
//                 });
//             })
//     }
// }
//
// function deleteComingDispatch(dispatchId) {
//     return () => {
//         return comingDispatchServices.deleteComingDispatch(dispatchId)
//             .then((result) => {
//                 if (result.code >= 400 && result.code <= 599) {
//                     throw new Error(result.message);
//                 }
//                 return result.data;
//             })
//     }
// }

const outGoingDispatchActions = {
    getAll,
    // getComingDispatchById,
    // getEditingComingDispatchById,
    // getAllDocumentType,
    // getAllStorageLocation,
    // getAllReleaseDepartment,
    createOutGoingDispatch,
    // getDispatchStream,
    // updateDispatchByForm,
    // deleteComingDispatch,
}

export default outGoingDispatchActions;