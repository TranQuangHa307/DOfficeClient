import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import authenticationReducer from "../reducers/authentication.reducer";
import comingDispatchReducer from "../reducers/comingDispatch.reducer";

const allReducers = combineReducers({
    authentication: authenticationReducer,
    comingDispatch: comingDispatchReducer,
});

const middlewares = [applyMiddleware(thunk, createLogger())];

const enhancer = composeWithDevTools(...middlewares);

const store = createStore(allReducers, enhancer);

export default store;
