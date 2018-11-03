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

export const getRestaurantNearby = ({ location, latitude, longitude }) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.get('/api/restaurant/getRestaurantNearby', {
      params: {
        location,
        latitude,
        longitude,
        keyword: 'restaurant',
      },
    })
      .then((res) => {
        dispatch(App.loadingDone());
        dispatch(getRestaurant(res.data));
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

export const searchRestaurant = ({
  keyword,
  location,
  latitude,
  longitude
}) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.get('/api/restaurant/searchRestaurant', {
      params: {
        keyword,
        location,
        latitude,
        longitude,
      }
    })
      .then((res) => {
        dispatch(App.loadingDone());
        dispatch(getRestaurant(res.data));
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

