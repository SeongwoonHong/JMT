import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers/root';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = reduxDevTools
  ? createStore(rootReducer, reduxDevTools, applyMiddleware(thunk))
  : createStore(rootReducer, applyMiddleware(thunk));

export default store;
