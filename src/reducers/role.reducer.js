const defaultState = {
    roles : [],
    roleOfUser: [],
    loading : false,
};

const roleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ROLE_LOADED':
            return {
                ...state,
                roles: action.payload,
                loading: false,
            };
        case 'ROLE_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'ROLE_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'ROLE_OF_USER_LOADED':
            return {
                ...state,
                roleOfUser: action.payload,
                loading: false,
            };
        case 'ROLE_OF_USER_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'ROLE_OF_USER_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default roleReducer;
