import { Restaurant } from 'actions';

const initialState = {
  list: [],
  activeRestaurant: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Restaurant.GET_RESTAURANT:
      return {
        ...state,
        list: action.payload,
      };
    case Restaurant.GET_RESTAURANT_DETAIL:
      return {
        ...state,
        activeRestaurant: action.payload,
      };
    default:
      return state;
  }
}
