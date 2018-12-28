import { Restaurant } from 'actions';

const initialState = {
  list: [],
  activeRestaurant: {},
  myRestaurants: [],
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
    case Restaurant.JOIN_RESTAURANT:
      const duplicate = state.myRestaurants.filter(restaurant => restaurant.restaurantId === action.restaurantId);
      const newRestaurant = {
        restaurantId: action.restaurantId,
        scheduleDate: action.scheduleDate,
      };

      if (duplicate.length) {
        return {
          ...state,
          myRestaurants: myRestaurants.map((restaurant) => {
            if (restaurant.restaurantId === action) {
              return newRestaurant;
            }
            return restaurant;
          })
        };
      }

      return {
        ...state,
        myRestaurants: [
          ...state.myRestaurants,
          newRestaurant
        ]
      };
    default:
      return state;
  }
}
