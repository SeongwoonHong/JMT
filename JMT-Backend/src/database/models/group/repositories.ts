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
