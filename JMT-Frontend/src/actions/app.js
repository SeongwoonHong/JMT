import axios from 'axios';
/**
 * Action types
 */

export const TOGGLE_VIEW = 'TOGGLE_VIEW';
export const LOADING_START = 'LOADING_START';
export const LOADING_DONE = 'LOADING_DONE';

/**
 * Action Creators
 */

export const toggleView = (view) => {
  return {
    type: TOGGLE_VIEW,
    payload: view,
  };
};

export const isLoggedIn = () => { // a temporary action creator for proving that it's possible to call our backend APIs
  return (dispatch) => {
    return axios.get('/api/user/check')
      .then((res) => {
        dispatch(this.getMsg(res.data.msg));
      });
  };
};

export const loadingStart = () => {
  return {
    type: LOADING_START,
  };
};

export const loadingDone = () => {
  return {
    type: LOADING_DONE,
  };
};
