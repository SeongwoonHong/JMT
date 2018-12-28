import db from '@db/index';

import Query from './queries';

export const joinRestaurant = async ({ userId, restaurantId, scheduleDate }) => {
  try {
    const result = await Query.joinRestaurant({ userId, restaurantId, scheduleDate });

    return {
      sucess: true,
      userId,
      restaurantId,
      scheduleDate,
    }
  } catch (e) {
    throw new Error(e);
  }
};
