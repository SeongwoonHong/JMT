import db from '@db/index';

import Query from './queries';

export const joinRestaurant = async (params) => {
  try {
    const groupRes = await Query.getGroupByRestaurant(params);
    /**
     * When there's an existing group already
     */
    if (groupRes.rows.length) {
      console.log('groupRes = ', groupRes);
      const groupId = groupRes.rows[0].id;
      await Query.joinExistingGroupRestaurant({ _groupId: groupId, ...params });

      return {
        success: true,
      }
    }
    
    /**
     * When there's no group created before
     */
    await Query.joinNewGroupRestaurant(params);

    return {
      success: true,
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserFromUserRestaurant = async (params) => {
  try {
    const userRes = await Query.getUserFromUserRestaurant(params);

    if (userRes.rows.length) {
      return {
        success: false,
        msg: "You've already joined at this time",
      }
    }

    return {
      success: true,
    }
  } catch (e) {
    throw new Error(e);
  }
}
