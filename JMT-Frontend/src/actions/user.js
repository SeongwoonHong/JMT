import axios from 'axios';
import { App } from './';

/**
 *  Action Types
 */
export const SEND_RESET_PASSWORD_EMAIL_SUCCESS = 'SEND_RESET_PASSWORD_EMAIL_SUCCESS';
export const SEND_RESET_PASSWORD_EMAIL_FAILURE = 'SEND_RESET_PASSWORD_EMAIL_FAILURE';

/**
 * Action creator
*/

const sendPresignedUrlWithFile = (url, file) => {
  return axios.put(url, file, {
    headers: {
      'Content-Type': file.type
    }
  });
};

export const uploadProfileImage = (file, token) => {
  return (dispatch) => {
    dispatch(App.loadingStart('uploadProfileImage'));

    return axios.get('/api/upload/profilePicture', {
      params: { token, fileName: file.name }
    })
      .then(({ data }) => {
        sendPresignedUrlWithFile(data.url, file)
          .then(() => dispatch(App.loadingDone()))
          .catch((e) => {
            dispatch(App.loadingDone());
            console.log(e);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

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
          msg: response.data.msgs
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
      .then((res) => {
        console.log('res = ', res);
        dispatch(App.loadingDone());
      })
      .catch((err) => {
        console.log(err);
        dispatch(App.loadingDone());
      });
  };
};
