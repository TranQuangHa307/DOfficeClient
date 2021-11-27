const defaultState = {
    activityHistories : [],
    loading : false,
};

const activityHistoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ACTIVITY_HISTORY_LOADED':
            return {
                ...state,
                activityHistories: action.payload,
                loading: false,
            };
        case 'ACTIVITY_HISTORY_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'ACTIVITY_HISTORY_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default activityHistoryReducer;
