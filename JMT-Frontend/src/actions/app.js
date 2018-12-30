/**
 * Action types
 */

export const TOGGLE_VIEW = 'TOGGLE_VIEW';
export const LOADING_START = 'LOADING_START';
export const LOADING_DONE = 'LOADING_DONE';
export const UPDATE_FILTER = 'UPDATE_FILTER';

/**
 * Action Creators
 */

export const toggleView = (view) => {
  return {
    type: TOGGLE_VIEW,
    payload: view,
  };
};

export const loadingStart = (requestInProcess = '') => {
  return {
    type: LOADING_START,
    payload: requestInProcess,
  };
};

export const loadingDone = () => {
  return {
    type: LOADING_DONE,
  };
};

/**
 * Filter action
 */
export const updateFilter = (searchParam) => {
  return {
    type: UPDATE_FILTER,
    payload: searchParam
  };
};
