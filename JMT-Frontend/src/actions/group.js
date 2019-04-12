import axios from 'axios';
import { toast } from 'react-toastify';

import { App } from './';

const { API_URL = '' } = process.env;

/**
 * Action types
 */

export const INSERT_COMMENT = 'INSERT_COMMENT';
export const INSERT_COMMENT_FAIL = 'INSERT_COMMENT_FAIL';
export const GET_GROUP = 'GET_GROUP';
export const GET_GROUP_FAIL = 'GET_GROUP_FAIL';
export const GET_GROUPS_BY_RESTAURANT_AVAILABLE = 'GET_GROUPS_BY_RESTAURANT_AVAILABLE';
export const SUB_LOADING_START = 'SUB_LOADING_START';
export const SUB_LOADING_DONE = 'SUB_LOADING_DONE';
export const GET_GROUPS_BY_USER = 'GET_GROUPS_BY_USER';
export const GET_GROUPS_BY_USER_FAIL = 'GET_GROUPS_BY_USER_FAIL';
export const CHECK_USER_GROUP = 'CHECK_USER_GROUP';
export const CHECK_USER_GROUP_FAIL = 'CHECK_USER_GROUP_FAIL';
/**
 * Action Creators
 */

export const getGroup = (data) => {
  return (dispatch) => {
    dispatch(App.loadingStart('getGroup'));
    return axios
      .get(`${API_URL}/api/group/getGroup`, {
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

export const checkUserGroup = (groupId) => {
  return (dispatch) => {
    dispatch(App.loadingStart('checkUserGroup'));
    return axios
      .get(`${API_URL}/api/group/checkUserGroup`, {
        params: {
          id: groupId
        }
      })
      .then((res) => {
        dispatch(App.loadingDone());
        return dispatch({ type: CHECK_USER_GROUP, payload: res.data.result });
      })
      .catch((e) => {
        // TODO - Toaster
        dispatch({
          type: CHECK_USER_GROUP_FAIL,
          payload: e
        });
      });
  };
};

export const insertComment = (data) => {
  return (dispatch) => {
    dispatch(App.loadingStart('insertComment'));

    return axios
      .post(`${API_URL}/api/group/insertComment`, {
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

export const getGroupsByUser = () => {
  return (dispatch) => {
    dispatch({
      type: SUB_LOADING_START,
      payload: 'getGroupsByUser'
    });

    return axios
      .get(`${API_URL}/api/group/getGroupsByUser`)
      .then((res) => {
        dispatch({ type: SUB_LOADING_DONE });
        dispatch({
          type: GET_GROUPS_BY_USER,
          payload: res.data.result
        });
      })
      .catch(({ response }) => {
        console.log(response.data.msg);
        toast.error(response.data.msg);
        dispatch({ type: SUB_LOADING_DONE });
        dispatch(App.loadingDone());
      });
  };
};

export const getGroupsByRestaurantAvailable = (restaurantId) => {
  return (dispatch) => {
    dispatch({
      type: SUB_LOADING_START,
      payload: 'getGroupsByRestaurantAvailable'
    });

    return axios
      .get(`${API_URL}/api/group/getGroupsByRestaurantAvailable`, {
        params: {
          restaurantId
        }
      })
      .then((res) => {
        dispatch({ type: SUB_LOADING_DONE });
        dispatch({
          type: GET_GROUPS_BY_RESTAURANT_AVAILABLE,
          payload: res.data.result
        });
      })
      .catch(({ response }) => {
        toast.error(response.data.msg);
        dispatch({ type: SUB_LOADING_DONE });
        dispatch(App.loadingDone());
      });
  };
};
