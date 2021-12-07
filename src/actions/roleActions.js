
// Return ve 1 ham. Nen duoc goi la higher order function
import userServices from "../services/user.services";
import outGoingDispatchServices from "../services/outGoingDispatch.services";
import roleServices from "../services/role.services";

function getAllRole() {
    return (dispatch) => {
        dispatch({type: 'ROLE_LOADING',})
        return roleServices.getAllRole()
            .then((result) => {
                dispatch({
                    type: 'ROLE_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'ROLE_FAILED',
                });
            })
    }
}

function getAllRoleOfUser(userId) {
    return (dispatch) => {
        dispatch({type: 'ROLE_OF_USER_LOADING',})
        return roleServices.getAllRoleOfUser(userId)
            .then((result) => {
                dispatch({
                    type: 'ROLE_OF_USER_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'ROLE_OF_USER_FAILED',
                });
            })
    }
}

function addRoleForUser(data) {
    return () => {
        return roleServices.addRoleForUser(data)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                if (result?.success === false) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}


const roleActions = {
    getAllRole,
    getAllRoleOfUser,
    addRoleForUser,
}

export default roleActions;