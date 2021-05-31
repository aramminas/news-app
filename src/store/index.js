import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';

// Reducers
import sourcesReducer from "./reducers/sourcesReducer";
import newsReducer from "./reducers/newsReducer";

const AllReducers = combineReducers({
    sources: sourcesReducer,
    news: newsReducer,
});

const InitialState = {};
const middleware = [thunk];

const store = createStore(
    AllReducers,
    InitialState,
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

export default store;