
// Return ve 1 ham. Nen duoc goi la higher order function
import userServices from "../services/user.services";
import outGoingDispatchServices from "../services/outGoingDispatch.services";

function getAllUser() {
    return (dispatch) => {
        dispatch({type: 'USER_LOADING',})
        return userServices.getAllUser()
            .then((result) => {
                dispatch({
                    type: 'USER_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'USER_FAILED',
                });
            })
    }
}

function getUserById(userId) {
    return (dispatch) => {
        dispatch({type: 'USER_DETAIL_LOADING',})
        return userServices.getUserById(userId)
            .then((result) => {
                dispatch({
                    type: 'USER_DETAIL_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'USER_DETAIL_FAILED',
                });
            })
    }
}

function getEditingUserById(userId) {
    return (dispatch) => {
        dispatch({type: 'EDITING_USER_LOADING',})
        return userServices.getUserById(userId)
            .then((result) => {
                dispatch({
                    type: 'EDITING_USER_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'EDITING_USER_FAILED',
                });
            })
    }
}

function createUser(data) {
    return () => {
        return userServices.createUser(data)
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

function updateUser(data) {
    return () => {
        return userServices.updateUser(data)
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

function activateUser(userId) {
    return () => {
        return userServices.activateUser(userId)
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

function deActivateUser(userId) {
    return () => {
        return userServices.deActivateUser(userId)
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

const userActions = {
    getAllUser,
    createUser,
    getUserById,
    getEditingUserById,
    updateUser,
    activateUser,
    deActivateUser,
}

export default userActions;