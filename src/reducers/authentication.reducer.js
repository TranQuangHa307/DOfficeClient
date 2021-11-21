const defaultState = {
    user: undefined,
    userLoaded: false,
};

const authenticationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'AUTHENTICATION_VALIDATED':
            return {
                ...state,
                user: action.payload,
                userLoaded: true,
            };
        case 'AUTHENTICATION_VALIDATE_FAILED':
            return {
                ...state,
                userLoaded: true,
            };
        case 'AUTHENTICATION_LOGGED_IN':
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authenticationReducer;
