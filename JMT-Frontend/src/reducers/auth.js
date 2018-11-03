import { Auth } from 'actions';

const initialState = {
  registered: false,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Auth.SIGNUP:
      return {
        ...state,
        registered: action.registered
      };
    default:
      return state;
  }
}
