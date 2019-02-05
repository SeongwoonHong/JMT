import db from '@db/index';

class Query {
  public static getGroup = (params): Promise<any> => {
    return db.executeSP('GET_GROUP', params);
  };

  public static getGroupsByUser = (params): Promise<any> => {
    return db.executeSP('GET_GROUPS_BY_USER', params);
  };
}

export default Query;
