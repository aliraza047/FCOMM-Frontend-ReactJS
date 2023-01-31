import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
const persister = 'Free';

export { store, persister };
