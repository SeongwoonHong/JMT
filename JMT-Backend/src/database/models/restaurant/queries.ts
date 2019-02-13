import db from '@db/index';
import { userRestaurant } from './model';

class Query {
  public static joinNewGroupRestaurant = (params: userRestaurant): Promise<any> => {
    return db.executeSP('INSERT_JOIN_NEW_RESTAURANT', params);
  };

  public static getGroupByRestaurant = (params: userRestaurant): Promise<any> => {
    return db.executeSP('GET_GROUP_BY_RESTAURANT', params);
  };

  public static joinExistingGroupRestaurant = (params): Promise<any> => {
    return db.executeSP('INSERT_JOIN_EXISTING_RESTAURANT', params);
  }

  public static getUserFromUserRestaurant = (params): Promise<any> => {
    return db.executeSP('GET_USER_FROM_USER_RESTAURANT', params);
  };
}

export default Query;
