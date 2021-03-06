import axios from 'axios';
import { toast } from 'react-toastify';
import { App } from './';

const { API_URL = '' } = process.env;

/**
 *  Action Types
 */
export const SEND_RESET_PASSWORD_EMAIL_SUCCESS = 'SEND_RESET_PASSWORD_EMAIL_SUCCESS';
export const SEND_RESET_PASSWORD_EMAIL_FAILURE = 'SEND_RESET_PASSWORD_EMAIL_FAILURE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const UPDATE_PROFILE_PICTURE_SUCCESS = 'UPDATE_PROFILE_PICTURE_SUCCESS';
export const UPDATE_PROFILE_PICTURE_FAILURE = 'UPDATE_PROFILE_PICTURE_FAILURE';
/**
 * Action creator
*/

export const sendResetPasswordEmail = (email) => {
  return (dispatch) => {
    dispatch(App.loadingStart('sendResetPasswordEmail'));

    return axios.post(`${API_URL}/api/user/sendResetPasswordEmail`, { email })
      .then(() => {
        dispatch(App.loadingDone());

        return dispatch({
          type: SEND_RESET_PASSWORD_EMAIL_SUCCESS,
        });
      })
      .catch(({ response }) => {
        dispatch(App.loadingDone());

        return dispatch({
          type: SEND_RESET_PASSWORD_EMAIL_FAILURE,
          msg: response.data.msg,
        });
      });
  };
};

export const updatePassword = (params) => {
  return (dispatch) => {
    dispatch(App.loadingStart('updatePassword'));

    return axios.post(`${API_URL}/api/user/updatePassword`, {
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

    return axios.post(`${API_URL}/api/user/updateProfile`, {
      displayName: params.displayName,
      password: params.password,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: res.data.displayName,
        });
        dispatch(App.loadingDone());
        toast.success('Successfully updated');
      })
      .catch(({ response }) => {
        console.log(err);
        dispatch({
          type: UPDATE_PROFILE_FAILURE,
          success: false,
          msg: response.data.msg,
        });
        dispatch(App.loadingDone());
        toast.error(response.data.msg);
      });
  };
};


export const updateProfilePicture = (profilePicture) => {
  return (dispatch) => {
    dispatch(App.loadingStart('updateProfilePicture'));

    return axios.post(`${API_URL}/api/user/updateProfilePicture`, {
      profilePicture,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_PROFILE_PICTURE_SUCCESS,
          payload: res.data.profilePicture
        });
        dispatch(App.loadingDone());
        toast.success('Successfully updated');
      })
      .catch(({ response }) => {
        console.log(response.data.msg);
        dispatch({
          type: UPDATE_PROFILE_PICTURE_FAILURE,
          success: false,
          msg: response.data.msg,
        });
        dispatch(App.loadingDone());
        toast.error(response.data.msg);
      });
  };
};
