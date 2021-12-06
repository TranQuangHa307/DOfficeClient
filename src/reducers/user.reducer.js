const defaultState = {
    users : [],
    userDetail: {},
    loading : false,
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case 'USER_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'USER_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'USER_DETAIL_LOADED':
            return {
                ...state,
                userDetail: action.payload,
                loading: false,
            };
        case 'USER_DETAIL_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'USER_DETAIL_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default userReducer;
