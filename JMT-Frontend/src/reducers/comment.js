// import { Comment } from 'actions';

const initialState = {
  list: [
    {
      id: '1',
      user: 'test1',
      avatar:
        'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png',
      comment: 'hahaasdkljflkdsajflkjasdlfkjsdalkfjlakdsjflksadjflskdjflk',
      date: '2019-01-01'
    },
    {
      id: '2',
      user: 'test2',
      avatar:
        'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430_1280.png',
      comment: 'haha2',
      date: '2019-01-01'
    }
  ],
  myComments: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case Restaurant.GET_RESTAURANT:
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };
    // case Restaurant.GET_RESTAURANT_DETAIL:
    //   const filteredRestaurant = state.list.filter(restaurant => restaurant.id === action.id);
    //   const distance = (filteredRestaurant[0] && filteredRestaurant[0].distance) || null;

    //   return {
    //     ...state,
    //     activeRestaurant: {
    //       ...action.payload,
    //       distance,
    //     },
    //   };
    // case Restaurant.JOIN_RESTAURANT:
    //   const duplicate = state.myRestaurants.filter(restaurant => restaurant.restaurantId === action.restaurantId);
    //   const newRestaurant = {
    //     restaurantId: action.restaurantId,
    //     scheduleDate: action.scheduleDate,
    //   };

    //   if (duplicate.length) {
    //     return {
    //       ...state,
    //       myRestaurants: myRestaurants.map((restaurant) => {
    //         if (restaurant.restaurantId === action) {
    //           return newRestaurant;
    //         }
    //         return restaurant;
    //       })
    //     };
    //   }

    //   return {
    //     ...state,
    //     myRestaurants: [
    //       ...state.myRestaurants,
    //       newRestaurant
    //     ]
    //   };
    default:
      return state;
  }
}
