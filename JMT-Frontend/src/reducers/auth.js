import { Auth, User } from 'actions';

const initialState = {
  registered: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Auth.SIGNUP:
      return {
        ...state,
        error: null,
        registered: action.registered
      };
    case Auth.SIGNUP_FAIL:
      return {
        ...state,
        registered: action.registered,
        error: action.payload,
      };
    case Auth.LOGIN:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case Auth.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case User.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          displayName: action.payload,
        }
      };
    case User.UPDATE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: action.payload,
        }
      };
    case User.UPDATE_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        error: action.msg,
      };
    case Auth.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
