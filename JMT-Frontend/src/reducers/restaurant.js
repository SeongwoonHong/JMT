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
      const filteredRestaurant = state.list.filter(restaurant => restaurant.id === action.id);
      const distance = (filteredRestaurant[0] && filteredRestaurant[0].distance) || null;

      return {
        ...state,
        activeRestaurant: {
          ...action.payload,
          distance,
        },
      };
    default:
      return state;
  }
}
