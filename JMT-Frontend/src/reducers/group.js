import { Group } from 'actions';

const initialState = {
  activeGroup: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Group.GET_GROUP:
      return {
        ...state,
        activeGroup: {
          ...action.payload
        }
      };
    default:
      return state;
  }
}
