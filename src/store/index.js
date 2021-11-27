import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import authenticationReducer from "../reducers/authentication.reducer";
import comingDispatchReducer from "../reducers/comingDispatch.reducer";
import documentTypeReducer from "../reducers/documentType.reducer";
import storageLocationReducer from "../reducers/storageLocation.reducer";
import userReducer from "../reducers/user.reducer";
import releaseDepartmentReducer from "../reducers/releaseDepartment.reducer";
import activityHistoryReducer from "../reducers/activityHistory.reducer";

const allReducers = combineReducers({
    authentication: authenticationReducer,
    comingDispatch: comingDispatchReducer,
    documentType: documentTypeReducer,
    storageLocation: storageLocationReducer,
    user: userReducer,
    releaseDepartment: releaseDepartmentReducer,
    activityHistory: activityHistoryReducer,
});

const middlewares = [applyMiddleware(thunk, createLogger())];

const enhancer = composeWithDevTools(...middlewares);

const store = createStore(allReducers, enhancer);

export default store;
