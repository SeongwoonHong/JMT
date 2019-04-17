import db from '@db/index';

class Query {
  public static getGroup = (params): Promise<any> => {
    return db.executeSP('GET_GROUP', params);
  };

  public static getGroupsByUser = (params): Promise<any> => {
    return db.executeSP('GET_GROUPS_BY_USER', params);
  };

  public static checkUserGroup = (params): Promise<any> => {
    return db.executeSP('GET_USERS_BY_GROUP', params);
  };

  public static getGroupsByRestaurantAvailable = (params): Promise<any> => {
    return db.executeSP('GET_GROUPS_BY_RESTAURANT_AVAILABLE', params);
  };
  public static getGroupsByRestaurant = (params): Promise<any> => {
    return db.executeSP('GET_GROUPS_BY_RESTAURANT', params);
  };

  public static getGroupsByRestaurantAvailable = (params): Promise<any> => {
    return db.executeSP('GET_GROUPS_BY_RESTAURANT_AVAILABLE', params);
  };
}

export default Query;
