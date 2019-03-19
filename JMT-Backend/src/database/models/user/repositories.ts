import db from '@db/index';
import * as dateUtils from '@utils/date-utils';
import * as jwtUtils from '@utils/jwt-utils';
import * as bcryptUtils from '@utils/bcrypt-utils';

import Query from './queries';

export const updateEmailVerifiationByEmail = (token: { email: string }) => {
  try {
    const { email } = token;

    Query.updateEmailVerifiationByEmailQuery(email);

    return {
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserByEmailOrDisplayName = async ({ displayName, email }) => {
  try {
    const param = email ? email : displayName;
    const data = await Query.getUserByEmailOrDisplayNameQuery(param);
    const { rows } = data;

    if (rows.length) {
      let duplicate: string;

      if (rows[0].displayName === displayName) {
        duplicate = 'displayName';
      } else if (rows[0].email === email) {
        duplicate = 'email';
      }

      return {
        msg: `${ duplicate } already exists`,
        success: false
      };
    }

    return {
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const signup = async ({ displayName, password, hashedPassword, email, profilePicture }) => {
  try {
    const result = await Query.signUpQuery({ displayName, password: hashedPassword, email, profilePicture });

    return {
      result,
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const login = async ({ email, password }) => {
  try {
    let passwordMatched: boolean = false;
    const userData = await getUserByEmail(email);

    if (!userData.success) {
      return {
        msg: 'account does not exist',
        success: false
      };
    }

    const { rows } = userData;

    passwordMatched = await bcryptUtils.compare(password, rows[0].password);

    if (!passwordMatched) {
      return {
        success: false,
        msg: 'password is not correct'
      };
    }

    return {
      result: rows[0],
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUserProfile = async (params) => {
  try {
    await Query.updateUserProfileQuery(params);

    return {
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const checkLogin = async (email: string) => {
  try {
    const userData = await Query.getUserByEmailQuery({ email });
    const { rows } = userData;

    return {
      success: true,
      result: rows[0]
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const updatePassword = async ({ email, password }) => {
  try {
    await Query.updatePasswordQuery({ email, password });

    return {
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserByEmail: any = async (email: string) => {
  try {
    const userData = await Query.getUserByEmailQuery({ email });
    const { rows } = userData;

    if (!rows.length) {
      return {
        success: false
      };
    }

    return {
      success: true,
      rows
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const updateProfilePicture = async ({ id, profilePicture }) => {
  try {
    await Query.updateProfilePictureQuery({ id, profilePicture });

    return {
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
};
