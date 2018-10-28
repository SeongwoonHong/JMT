import { combineReducers } from 'redux';
import { App, Alert, Restaurants, GoogleMap } from './';

const appReducer = combineReducers({
  App,
  Alert,
  Restaurants,
  GoogleMap,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

