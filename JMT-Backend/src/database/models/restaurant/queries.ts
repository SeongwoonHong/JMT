import db from '@db/index';

class Query {
  public static joinRestaurant = (params): Promise<any> => {
    return db.executeSP('INSERT_JOIN_RESTAURANT', params);
  };
}

export default Query;
