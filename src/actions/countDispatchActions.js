// Return ve 1 ham. Nen duoc goi la higher order function
import countDispatchServices from "../services/countDispatch.services";

function getCountDispatch() {
    return (dispatch) => {
        dispatch({type: 'COUNT_DISPATCH_LOADING',})
        return countDispatchServices.getCountDispatch()
            .then((result) => {
                dispatch({
                    type: 'COUNT_DISPATCH_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'COUNT_DISPATCH_FAILED',
                });
            })
    }
}


const countDispatchActions = {
    getCountDispatch,
}

export default countDispatchActions;