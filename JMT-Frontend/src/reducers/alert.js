import { Alert } from 'actions';

const initialState = {
  isVisible: false,
  msg: null,
  type: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Alert.ALERT_SHOW:
      return {
        isVisible: true,
        msg: action.alert.msg,
        type: action.alert.type,
      };
    case Alert.ALERT_HIDE:
      return initialState;
    default:
      return state;
  }
}
