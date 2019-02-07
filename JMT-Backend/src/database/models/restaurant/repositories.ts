import db from '@db/index';

import { joinRestaurantParams } from './model';
import Query from './queries';

export const joinRestaurant = async (params: joinRestaurantParams) => {
  try {
    const result = await Query.joinRestaurant(params);

    return {
      success: true,
    }
  } catch (e) {
    throw new Error(e);
  }
};
