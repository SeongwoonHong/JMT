import { Restaurant } from './';

export const UPDATE_FILTER = 'UPDATE_FILTER';

/**
 * Action TYpes
 */
export const updateFilter = (searchMethod) => {
  return {
    type: UPDATE_FILTER,
    payload: searchMethod
  };
};

