import { combineReducers } from 'redux';
import { App, Alert, Restaurants } from './';

const appReducer = combineReducers({
  App,
  Alert,
  Restaurants,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

