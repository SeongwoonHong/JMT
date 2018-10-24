import axios from 'axios';
/**
 * Action types
 */

export const GET_RESTAURANT = 'GET_RESTAURANT';

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
    return axios.get('/api/restaurant/getRestaurantNearby')
      .then((res) => {
        dispatch(this.getRestaurant(res.data));
      })
      .catch((e) => {
        // To do - Toaster
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

