import { App } from 'actions';

const initialState = {
  view: 'list',
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case App.TOGGLE_VIEW:
      return {
        view: action.payload,
      };
    case App.LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case App.LOADING_DONE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
