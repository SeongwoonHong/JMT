import axios from 'axios';
import history from 'utils/history';

import { App } from './';

/**
 * Action types
 */

export const GET_RESTAURANT = 'GET_RESTAURANT';
export const GET_RESTAURANT_FAIL = 'GET_RESTAURANT_FAIL';
export const SEARCH_RESTAURANT = 'SEARCH_RESTAURANT';
export const SEARCH_RESTAURANT_FAIL = 'SEARCH_RESTAURANT_FAIL';
export const GET_RESTAURANT_DETAIL = 'GET_RESTAURANT_DETAIL';
export const GET_RESTAURANT_DETAIL_FAIL = 'GET_RESTAURANT_DETAIL_FAIL';
export const GET_RESTAURANT_AUTOCOMPLETE = 'GET_RESTAURANT_AUTOCOMPLETE';
/**
 * Action Creators
 */

export const getRestaurant = (data) => {
  return {
    type: GET_RESTAURANT,
    payload: data,
  };
};

export const getRestaurantDetail = (id) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.get('/api/restaurant/getRestaurantDetail', {
      params: {
        id
      }
    })
      .then((res) => {
        dispatch({ type: GET_RESTAURANT_DETAIL, payload: res.data, id });
        dispatch(App.loadingDone());
      })
      .catch((e) => {
        // TODO - Toaster
        dispatch({
          type: GET_RESTAURANT_DETAIL_FAIL,
          payload: e,
        });
      });
  };
};

export const searchRestaurant = ({
  cuisines,
  location,
  latitude,
  longitude
}) => {
  return (dispatch) => {
    dispatch(App.loadingStart());

    return axios.get('/api/restaurant/searchRestaurant', {
      params: {
        cuisines,
        location,
        latitude,
        longitude,
      }
    })
      .then((res) => {
        dispatch(App.loadingDone());
        dispatch(getRestaurant(res.data));
        let queryString = `?cuisines=${cuisines}&`;

        if (location) {
          queryString += `&location=${location}`;
        } else {
          queryString += `latitude=${latitude}&longitude=${longitude}`;
        }

        return history.push(`/main${queryString}`);
      })
      .catch((e) => {
        // TODO - Toaster
        dispatch({
          type: SEARCH_RESTAURANT_FAIL,
          payload: e
        });
        console.log(e);
      });
  };
};

/**
 * @param {string} keyword
 * @param {number} latitude for now it's hardcoded
 * @param {number} longitude for now it's hardcoded
 */
export const getRestaurantAutocomplete = ({
  keyword,
  latitude = 43.780130799999995,
  longitude = -79.4136106
}) => {
  return () => {
    return axios.get('/api/restaurant/getRestaurantAutoComplete', {
      params: {
        keyword,
        latitude,
        longitude,
      }
    })
      .then((e) => {
        return e.data;
      })
      .catch((e) => {
        console.log(e); // TODO - Toaster
      });
  };
};

