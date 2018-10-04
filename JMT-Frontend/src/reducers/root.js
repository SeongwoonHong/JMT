import { combineReducers } from 'redux';
import { App, Alert } from './';

const appReducer = combineReducers({
  App,
  Alert,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

