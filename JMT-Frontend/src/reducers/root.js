import { combineReducers } from 'redux';
import { App, Alert, Restaurants, GoogleMap, Auth } from './';

const appReducer = combineReducers({
  App,
  Alert,
  Restaurants,
  GoogleMap,
  Auth,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

