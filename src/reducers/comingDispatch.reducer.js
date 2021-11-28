const defaultState = {
    comingDispatchs : [],
    loading : false,
    editingComingDispatch : undefined,
    comingDispatchDetail : {},
};

const comingDispatchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'COMING_DISPATCH_LOADED':
            return {
                ...state,
                comingDispatchs: action.payload,
                loading: false,
            };
        case 'COMING_DISPATCH_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'COMING_DISPATCH_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'COMING_DISPATCH_DETAIL_LOADED':
            return {
                ...state,
                comingDispatchDetail: action.payload,
                loading: false,
            };
        case 'COMING_DISPATCH_DETAIL_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'COMING_DISPATCH_DETAIL_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'EDITING_COMING_DISPATCH_LOADED':
            return {
                ...state,
                editingComingDispatch: action.payload,
                loading: false,
            };
        case 'EDITING_COMING_DISPATCH_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'EDITING_COMING_DISPATCH_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default comingDispatchReducer;
