import { Filter } from 'actions';

const initialState = {
  data: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Filter.UPDATE_FILTER:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
}

