import db from '@db/index';

class Query {

  public static signUpQuery = (params): Promise<any> => {
    return db.executeSP('INSERT_USER', params);
  }

  public static removeByIdQuery = (params): Promise<any> => {
    return db.executeSP('DELETE_USER', params);
  };
  
  public static getUserByEmailOrDisplayNameQuery = (params): Promise<any> => {
    return db.executeSP('GET_USER_BY_EMAIL_OR_DISPLAYNAME', params);
  }

  public static getUserByEmailQuery = (params): Promise<any> => {
    return db.executeSP('GET_USER_BY_EMAIL', params);
  }

  public static updateEmailVerifiationByEmailQuery = (params): Promise<any> => {
    return db.executeSP('UPDATE_EMAIL_VERIFICATION', params);
  }

  public static updateUserProfile = (params): Promise<any> => {
    return db.executeSP('UPDATE_USER_PROFILE', params);
  }
}

export default Query;
