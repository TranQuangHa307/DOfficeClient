const defaultState = {
    outGoingDispatchs : [],
    loading : false,
    editingOutGoingDispatch : undefined,
    outGoingDispatchDetail : {},
};

const outGoingDispatchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'OUT_GOING_DISPATCH_LOADED':
            return {
                ...state,
                outGoingDispatchs: action.payload,
                loading: false,
            };
        case 'OUT_GOING_DISPATCH_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'OUT_GOING_DISPATCH_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'OUT_GOING_DISPATCH_DETAIL_LOADED':
            return {
                ...state,
                outGoingDispatchDetail: action.payload,
                loading: false,
            };
        case 'OUT_GOING_DISPATCH_DETAIL_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'OUT_GOING_DISPATCH_DETAIL_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'EDITING_OUT_GOING_DISPATCH_LOADED':
            return {
                ...state,
                editingOutGoingDispatch: action.payload,
                loading: false,
            };
        case 'EDITING_OUT_GOING_DISPATCH_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'EDITING_OUT_GOING_DISPATCH_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'DETAIL_USER_VIEW_DISPATCH_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'DETAIL_USER_VIEW_DISPATCH_LOADED':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default outGoingDispatchReducer;
