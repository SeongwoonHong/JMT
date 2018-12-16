import axios from 'axios';
import { Cookies } from 'react-cookie';
import history from 'utils/history';
import { App } from './';

/**
 *  Action Types
 */
export const SIGNUP = 'SIGNUP';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const PROFILE_IMAGE = 'PROFILE_IMAGE';
export const PROFILE_IMAGE_FAIL = 'PROFILE_IMAGE_FAIL';
export const TOKEN_DECODE = 'TOKEN_DECODE';
/**
 * Action creator
*/

const cookies = new Cookies();

export const signupSuccess = () => {
  return ({
    type: SIGNUP,
    registered: true,
  });
};

export const signupFail = (error) => {
  return ({
    type: SIGNUP_FAIL,
    registered: false,
    payload: error,
  });
};

export const loginSuccess = (user) => {
  return ({
    type: LOGIN,
    payload: user,
  });
};

export const loginFail = (error) => {
  return ({
    type: LOGIN_FAIL,
    payload: error,
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
      .catch(({ response }) => {
        dispatch(App.loadingDone());

        return dispatch(signupFail(response.data)); // TODO - toaster here
      });
  };
};

export const login = (params) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.post('/api/user/login', {
      email: params.email,
      password: params.password,
    })
      .then(({ data }) => {
        dispatch(App.loadingDone());
        cookies.set('JMT_AUTH_TOKEN', data.token);

        return dispatch(loginSuccess(data)); // TODO -toaster here
      })
      .catch(({ response }) => {
        dispatch(App.loadingDone());

        return dispatch(loginFail(response.data)); // TODO - toaster here
      });
  };
};

const sendPresignedUrlWithFile = (url, file) => {
  return axios.put(url, file, {
    headers: {
      'Content-Type': file.type
    }
  });
};

export const uploadProfileImage = (file, token) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.get('/api/upload/profilePicture', {
      params: { token }
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

export const tokenDecode = (token) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.get('/api/user/check', {
      params: { token }
    })
      .then(({ data }) => {
        dispatch(App.loadingDone());

        if (!data.success) {
          return history.push('/'); // TODO: toaster with a message such as 'not valid token'
        }

        return false;
      })
      .catch(() => {
        dispatch(App.loadingDone());

        return history.push('/');
      });
  };
};
