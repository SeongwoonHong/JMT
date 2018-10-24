import { App } from 'actions';

const initialState = {
  view: 'list'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case App.TOGGLE_VIEW:
      return {
        view: action.payload
      };
    default:
      return state;
  }
}
