import { Group } from 'actions';

const initialState = {
  activeGroup: {},
  groups: [],
  isLoading: false,
  requestInProcess: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Group.SUB_LOADING_START:
      return {
        ...state,
        isLoading: true,
        requestInProcess: action.payload,
      };
    case Group.SUB_LOADING_DONE:
      return {
        ...state,
        isLoading: false,
        requestInProcess: null,
      };
    case Group.GET_GROUP:
      return {
        ...state,
        activeGroup: {
          ...action.payload
        }
      };
    case Group.GET_GROUPS_BY_USER:
      return {
        ...state,
        groups: action.payload
      };
    default:
      return state;
  }
}
