import { combineReducers } from 'redux';
import { App, Alert, Restaurants, GoogleMap, Auth, Comments, Group } from './';

const appReducer = combineReducers({
  App,
  Alert,
  Restaurants,
  GoogleMap,
  Auth,
  Comments,
  Group
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
