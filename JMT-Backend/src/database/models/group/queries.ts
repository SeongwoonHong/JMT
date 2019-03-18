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

<<<<<<< HEAD
  public static getGroupsByRestaurant = (params): Promise<any> => {
    return db.executeSP('GET_GROUPS_BY_RESTAURANT', params);
  }
=======
  public static getGroupsByRestaurantAvailable = (params): Promise<any> => {
    return db.executeSP('GET_GROUPS_BY_RESTAURANT_AVAILABLE', params);
  };
>>>>>>> 989c1b8... dev group list
}

export default Query;
