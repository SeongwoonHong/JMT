import { Restaurant } from 'actions';

const initialState = {
  data: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Restaurant.GET_RESTAURANT:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
}
