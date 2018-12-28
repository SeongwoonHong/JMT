import axios from 'axios';
import store from 'stores/store';

const setTokenToHeader = () => {
  let token;

  if (store.getState().Auth.user && store.getState().Auth.user.token) {
    token = store.getState().Auth.user.token; // eslint-disable-line
    axios.defaults.headers.common['x-access-token'] = token;
  }
};

/**
 * Axios listens to store token
 */
store.subscribe(setTokenToHeader);
