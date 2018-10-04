import { App } from 'actions';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case App.GET_MSG:
      return {
        msg: action.payload,
      };
    default:
      return state;
  }
}
