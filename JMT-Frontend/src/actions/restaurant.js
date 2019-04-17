import axios from 'axios';
import history from 'utils/history';
import { toast } from 'react-toastify';

import { App } from './';

const { API_URL = '' } = process.env;

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
export const JOIN_RESTAURANT = 'JOIN_RESTAURANT';
export const JOIN_RESTAURANT_FAIL = 'JOIN_RESTAURANT_FAIL';
/**
 * Action Creators
 */

export const getRestaurant = (data) => {
  return {
    type: GET_RESTAURANT,
    payload: data
  };
};

export const getRestaurantDetail = (id) => {
  return (dispatch) => {
    dispatch(App.loadingStart('getRestaurantDetail'));

    return axios
      .get('/api/restaurant/getRestaurantDetail', {
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
          payload: e
        });
      });
  };
};

export const searchRestaurant = ({
  cuisines,
  location,
  latitude,
  longitude,
  ...rest
}) => {
  return (dispatch) => {
    const { sort_by: sortBy, price } = rest;

    dispatch(App.loadingStart('searchRestaurant'));
    return axios
      .get(`${API_URL}/api/restaurant/searchRestaurant`, {
        params: {
          location,
          latitude,
          longitude,
          sort_by: sortBy,
          categories: cuisines, // on the backend, 'cuisines' is now categories. so we need to pass it as categories
          price
        }
      })
      .then((res) => {
        dispatch(App.loadingDone());
        dispatch(getRestaurant(res.data));
        let url = `/restaurant-list?cuisines=${cuisines}`;

        if (location) {
          url += `&location=${location}`;
        } else {
          url += `&latitude=${latitude}&longitude=${longitude}`;
        }

        if (sortBy) {
          url += `&sort_by=${sortBy}`;
        }

        if (price) {
          url += `&price=${price}`;
        }

        return history.push(`/main${url}`);
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
    return axios
      .get(`${API_URL}/api/restaurant/getRestaurantAutoComplete`, {
        params: {
          keyword,
          latitude,
          longitude
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

/**
 *
 * @param {string} date ex) '2018-12-14 20:30:0'
 * @param {string} restaurantId
 * @param {string} restaurantName
 */
export const joinRestaurant = (date, restaurantId, restaurantName) => {
  return (dispatch) => {
    dispatch(App.loadingStart('joinRestaurant'));

    return axios
      .post(`${API_URL}/api/restaurant/joinRestaurant`, {
        date,
        restaurantId,
        restaurantName
      })
      .then((res) => {
        dispatch({ type: JOIN_RESTAURANT });
        dispatch(App.loadingDone());
        toast.success('Saved');
        return history.push(`/main/group?id=${res.data.groupId}`);
      })
      .catch(({ response }) => {
        console.log(response.data);
        toast.error(response.data.msg);
        dispatch({ type: JOIN_RESTAURANT_FAIL });
        dispatch(App.loadingDone());
      });
  };
};
