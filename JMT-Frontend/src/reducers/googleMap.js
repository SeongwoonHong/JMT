import { GoogleMap } from 'actions';

const initialState = {
  settings: {
    defaultZoom: 10,
    center: {
      lat: null,
      lng: null,
    },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GoogleMap.SET_DEFAULT_ZOOM:
      return {
        settings: {
          ...state.settings,
          defaultZoom: action.payload,
        }
      };
    case GoogleMap.SET_CENTER:
      return {
        settings: {
          ...state.settings,
          center: action.payload,
        },
      };
    default:
      return state;
  }
}
