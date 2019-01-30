import axios from 'axios';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import history from 'utils/history';
import { App } from './';

/**
 *  Action Types
 */
export const SIGNUP = 'SIGNUP';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const TOKEN_DECODE = 'TOKEN_DECODE';
export const LOG_OUT = 'LOG_OUT';

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
    dispatch(App.loadingStart('signup'));

    return axios.post('/api/user/signup', {
      displayName: params.displayName,
      password: params.password,
      email: params.email,
      profilePicture: params.profilePicture,
    })
      .then(() => {
        dispatch(App.loadingDone());
        toast.success('Signup Success!');
        history.push('/login');

        return dispatch(signupSuccess());
      })
      .catch(({ response }) => {
        toast.error(response.data.msg);
        dispatch(App.loadingDone());
      });
  };
};

export const login = (params, reRoute) => {
  return (dispatch) => {
    dispatch(App.loadingStart('login'));

    return axios.post('/api/user/login', {
      email: params.email,
      password: params.password,
    })
      .then(({ data }) => {
        dispatch(App.loadingDone());
        cookies.set('JMT_AUTH_TOKEN', data.token, { path: '/' });
        toast.success('Login Success!');
        history.push(reRoute);

        return dispatch(loginSuccess(data));
      })
      .catch(({ response }) => {
        dispatch(App.loadingDone());
        toast.error(response.data.msg);

        return dispatch(loginFail(response.data));
      });
  };
};

export const tokenDecode = (token) => {
  return (dispatch) => {
    dispatch(App.loadingStart('tokenDecode'));

    return axios.get('/api/user/verifyToken', {
      params: { token }
    })
      .then(({ data }) => {
        dispatch(App.loadingDone());

        if (!data.success) {
          toast.error('Not a valid token');
          return history.push('/');
        }

        return data.decoded;
      })
      .catch(() => {
        dispatch(App.loadingDone());

        return history.push('/');
      });
  };
};

export const checkLogin = (token) => {
  return (dispatch) => {
    dispatch(App.loadingStart('checkLogin'));

    return axios.get('/api/user/checkUser', {
      params: { token }
    })
      .then(({ data }) => {
        dispatch(loginSuccess(data.userData));

        return dispatch(App.loadingDone());
      })
      .catch(() => {
        return dispatch(App.loadingDone());
      });
  };
};

export const logout = () => {
  cookies.remove('JMT_AUTH_TOKEN', { path: '/' });
  toast.success('Logout Success!');

  return {
    type: LOG_OUT
  };
};

export const sendSignupEmail = (email) => {
  return axios.post('/api/user/sendSignupEmail', { email });
};
