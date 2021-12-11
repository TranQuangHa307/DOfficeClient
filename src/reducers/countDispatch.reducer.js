const defaultState = {
    countDispatch : {},
    loading : false,
};

const countDispatchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'COUNT_DISPATCH_LOADED':
            return {
                ...state,
                countDispatch: action.payload,
                loading: false,
            };
        case 'COUNT_DISPATCH_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'COUNT_DISPATCH_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default countDispatchReducer;
