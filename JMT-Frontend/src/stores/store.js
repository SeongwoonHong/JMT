import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers/root';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store;

if (reduxDevTools) {
  store = createStore(rootReducer, reduxDevTools, applyMiddleware(thunk));
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;
