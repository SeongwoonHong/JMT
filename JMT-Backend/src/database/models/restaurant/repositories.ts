import db from '@db/index';

import Query from './queries';

export const joinRestaurant = async params => {
  try {
    const groupRes = await Query.getGroupByRestaurant(params);
    /**
     * When there's an existing group already
     */
    if (groupRes.rows.length) {
      const groupId = groupRes.rows[0].id;
      await Query.joinExistingGroupRestaurant({ _groupId: groupId, ...params });

      return {
        success: true,
        groupId
      };
    }

    /**
     * When there's no group created before
     */
    let groupId = '';
    await Query.joinNewGroupRestaurant(params);
    const groupResAfterJoin = await Query.getGroupByRestaurant(params);

    if (groupResAfterJoin.rows.length) {
      groupId = groupResAfterJoin.rows[0].id;
    }

    return groupId;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserFromUserRestaurant = async params => {
  try {
    const userRes = await Query.getUserFromUserRestaurant(params);

    if (userRes.rows.length) {
      return {
        success: false,
        msg: "You've already joined at this time"
      };
    }

    return {
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
};
