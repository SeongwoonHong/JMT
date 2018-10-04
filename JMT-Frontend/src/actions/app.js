import axios from 'axios';
/**
 * Action types
 */

export const GET_MSG = 'GET_MSG';

/**
 * Action Creators
 */

export function getMsg(msg) { // a temporary action creator
  return {
    type: GET_MSG,
    payload: msg,
  };
}

export function getMsgFromServer() { // a temporary action creator for proving that it's possible to call our backend APIs
  return (dispatch) => {
    return axios.get('/api/helloworld')
      .then((res) => {
        dispatch(this.getMsg(res.data.msg));
      });
  };
}
