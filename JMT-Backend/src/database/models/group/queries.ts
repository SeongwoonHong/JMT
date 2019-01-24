import db from '@db/index';

class Query {
  public static getGroup = (params): Promise<any> => {
    return db.executeSP('GET_GROUP', params);
  };
}

export default Query;
