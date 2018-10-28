export const SET_DEFAULT_ZOOM = 'SET_DEFAULT_ZOOM';
export const SET_CENTER = 'SET_CENTER';

export const setDefaultZoom = (value) => {
  return {
    type: SET_DEFAULT_ZOOM,
    payload: value
  };
};

export const setCenter = (value) => {
  return {
    type: SET_CENTER,
    payload: value,
  };
};
