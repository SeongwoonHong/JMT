import axios from 'axios';

import { App } from './';

/**
 * Action types
 */

export const INSERT_COMMENT = 'INSERT_COMMENT';
export const INSERT_COMMENT_FAIL = 'INSERT_COMMENT_FAIL';
export const GET_GROUP = 'GET_GROUP';
export const GET_GROUP_FAIL = 'GET_GROUP_FAIL';
/**
 * Action Creators
 */

export const getGroup = (data) => {
  return (dispatch) => {
    dispatch(App.loadingStart('getGroup'));
    return axios
      .get('/api/group/getGroup', {
        params: {
          id: data
        }
      })
      .then((res) => {
        dispatch({ type: GET_GROUP, payload: res.data.result });
        dispatch(App.loadingDone());
      })
      .catch((e) => {
        // TODO - Toaster
        dispatch({
          type: GET_GROUP_FAIL,
          payload: e
        });
      });
  };
};

export const insertComment = (data) => {
  return (dispatch) => {
    dispatch(App.loadingStart('insertComment'));

    return axios
      .post('/api/group/insertComment', {
        params: {
          data
        }
      })
      .then((res) => {
        dispatch({ type: INSERT_COMMENT, payload: res.data });
        dispatch(App.loadingDone());
      })
      .catch((e) => {
        // TODO - Toaster
        dispatch({
          type: INSERT_COMMENT_FAIL,
          payload: e
        });
      });
  };
};
