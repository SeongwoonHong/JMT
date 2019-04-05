/**
 * Action constants
 */
export const ALERT_SHOW = 'ALERT_SHOW';
export const ALERT_HIDE = 'ALERT_HIDE';

/**
 * Action creators
 */
let alertID = null;

export function hide() {
  return {
    type: ALERT_HIDE,
  };
}

export function show(alert) {
  return (dispatch) => {
    clearTimeout(alertID);
    dispatch({
      type: ALERT_SHOW,
      alert,
    });

    return alertID = setTimeout(() => dispatch(hide()), 3000);
  };
}
