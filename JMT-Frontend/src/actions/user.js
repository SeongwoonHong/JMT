import axios from 'axios';
import { App } from './';

/**
 *  Action Types
 */
export const SEND_RESET_PASSWORD_EMAIL_SUCCESS = 'SEND_RESET_PASSWORD_EMAIL_SUCCESS';
export const SEND_RESET_PASSWORD_EMAIL_FAILURE = 'SEND_RESET_PASSWORD_EMAIL_FAILURE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
/**
 * Action creator
*/

export const sendResetPasswordEmail = (email) => {
  return (dispatch) => {
    dispatch(App.loadingStart('sendResetPasswordEmail'));

    return axios.post('/api/user/sendResetPasswordEmail', { email })
      .then(() => {
        dispatch(App.loadingDone());

        return dispatch({
          type: SEND_RESET_PASSWORD_EMAIL_SUCCESS,
          success: true,
        });
      })
      .catch(({ response }) => {
        dispatch(App.loadingDone());

        return dispatch({
          type: SEND_RESET_PASSWORD_EMAIL_FAILURE,
          success: false,
          msg: response.data.msg,
        });
      });
  };
};

export const updatePassword = (params) => {
  return (dispatch) => {
    dispatch(App.loadingStart('updatePassword'));

    return axios.post('/api/user/updatePassword', {
      password: params.password,
      token: params.token
    })
      .then(() => {
        dispatch(App.loadingDone());
      })
      .catch((err) => {
        console.log(err);
        dispatch(App.loadingDone());
      });
  };
};

export const updateProfile = (params) => {
  return (dispatch) => {
    dispatch(App.loadingStart('updateProfile'));

    return axios.post('/api/user/updateProfile', {
      displayName: params.displayName,
      password: params.password,
    })
      .then((res) => {
        // TODO
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: res
        });
        dispatch(App.loadingDone());
      })
      .catch(({ response }) => {
        console.log(err);
        dispatch({
          type: UPDATE_PROFILE_FAILURE,
          success: false,
          msg: response.data.msg,
        });
        dispatch(App.loadingDone());
      });
  };
};
