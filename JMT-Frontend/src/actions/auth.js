import axios from 'axios';
import { App } from './';

/**
 *  Action Types
 */
export const SIGNUP = 'SIGNUP';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

/**
 * Action creator
*/

export const signupSuccess = () => {
  return ({
    type: SIGNUP,
    registered: true,
  });
};

export const signupFail = () => {
  return ({
    type: SIGNUP_FAIL,
    registered: false
  });
};

export const signup = (params) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.post('/api/user/signup', {
      display_name: params.displayName,
      password: params.password,
      email: params.email,
    })
      .then(() => {
        dispatch(App.loadingDone());

        return dispatch(signupSuccess()); // TODO - toaster here
      })
      .catch((e) => {
        dispatch(App.loadingDone());

        return dispatch(signupFail()); // TODO - toaster here
      });
  };
};

