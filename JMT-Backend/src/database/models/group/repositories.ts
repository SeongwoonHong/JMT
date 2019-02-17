import Query from './queries';

export const getGroup = async id => {
  try {
    const groupData = await Query.getGroup({ id });
    const { rows } = groupData;

    return {
      success: true,
      result: rows[0]
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const getGroupsByUser = async userId => {
  try {
    const groupData = await Query.getGroupsByUser(userId);
    const { rows } = groupData;

    return {
      success: true,
      result: rows
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const checkUserGroup = async id => {
  try {
    const groupData = await Query.checkUserGroup({ id });
    const { rows } = groupData;

    return {
      success: true,
      result: rows
    };
  } catch (e) {
    throw new Error(e);
  }
};
