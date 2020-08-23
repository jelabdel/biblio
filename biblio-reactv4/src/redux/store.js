import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const middlewares = [thunkMiddleware, logger];

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middlewares)));

export default store;
