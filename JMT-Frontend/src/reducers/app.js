import { App } from 'actions';

const initialState = {
  view: 'list',
  isLoading: false,
  requestInProcess: null,
  filter: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case App.TOGGLE_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    case App.LOADING_START:
      return {
        ...state,
        isLoading: true,
        requestInProcess: action.payload,
      };
    case App.LOADING_DONE:
      return {
        ...state,
        isLoading: false,
        requestInProcess: null,
      };
    case App.UPDATE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
