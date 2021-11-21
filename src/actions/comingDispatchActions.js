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

const comingDispatchActions = {
    getAll,
}

export default comingDispatchActions;