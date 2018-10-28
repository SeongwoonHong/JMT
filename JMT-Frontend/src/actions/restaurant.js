import axios from 'axios';
import { App } from './';

/**
 * Action types
 */

export const GET_RESTAURANT = 'GET_RESTAURANT';
export const GET_RESTAURANT_FAIL = 'GET_RESTAURANT_FAIL';
export const SEARCH_RESTAURANT = 'SEARCH_RESTAURANT';
export const SEARCH_RESTAURANT_FAIL = 'SEARCH_RESTAURANT_FAIL';
/**
 * Action Creators
 */

export const getRestaurant = (data) => {
  return {
    type: GET_RESTAURANT,
    payload: data,
  };
};

// For now, it only returns hard coded values near Finch Station
export const getRestaurantNearby = () => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.get('/api/restaurant/getRestaurantNearby')
      .then((res) => {
        dispatch(App.loadingDone());
        dispatch(this.getRestaurant(res.data));
      })
      .catch((e) => {
        // To do - Toaster
        dispatch({
          type: GET_RESTAURANT_FAIL,
          payload: e
        });
        console.log(e);
      });
  };
};

export const searchRestaurant = (keyword, location) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.get('/api/restaurant/searchRestaurant', {
      params: {
        keyword,
        location,
      }
    })
      .then((res) => {
        dispatch(App.loadingDone());
        dispatch(this.getRestaurant(res.data));
      })
      .catch((e) => {
        // To do - Toaster
        dispatch({
          type: SEARCH_RESTAURANT_FAIL,
          payload: e
        });
        console.log(e);
      });
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

