import axios from 'axios';
/**
 * Action types
 */

export const TOGGLE_VIEW = 'TOGGLE_VIEW';

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

