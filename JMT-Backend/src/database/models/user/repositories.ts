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
      success: true,
    };
  } catch (e) {
    throw new Error(e);
  }
}

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
        msg: `${duplicate} already exists`,
        success: false,
      };
    }

    return {
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
}

export const signup = async ({ displayName, password, hashedPassword, email, avatar }) => {
  try {
    const result = await Query.signUpQuery({ displayName, password: hashedPassword, email, avatar })

    sendVerificationEmail({
      displayName,
      password,
      email,
      avatar
    });

    return {
      result,
      success: true
    };
  } catch (e) {
    throw new Error(e);
  }
}

export const login = async ({ email, password }) => {
  try {
    let passwordMatched: boolean = false;
    const userData = getUserByEmail(email);

    if (!userData.success) {
      return {
        msg: 'account does not exist',
        success: false,
      };
    }

    const { rows } = userData;
    const { verified } = rows[0];

    passwordMatched = await bcryptUtils.compare(password, rows[0].password);

    if (!passwordMatched) {
      return {
        success: false,
        msg: 'password is not correct',
      };
    }

    if (!verified) {
      return {
        success: false,
        msg: 'Please verify your email',
      };
    }

    return {
      result: rows[0],
      success: true,
    };
  } catch (e) {
    throw new Error(e);
  }
}

const sendVerificationEmail = (fields) => {
  return jwtUtils.createEmailToken(fields);
}

export const updateUserProfile = async (params) => {
  try {
    await Query.updateUserProfileQuery(params);

    return {
      success: true,
    };
  } catch (e) {
    throw new Error(e);
  }
}

export const checkLogin = async (email: string) => {
  try {
    const userData = await Query.getUserByEmailQuery({ email });
    const { rows } = userData;

    return {
      success: true,
      result: rows[0],
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const updatePassword = async ({ email, password }) => {
  try {
    await Query.updatePasswordQuery({ email, password });

    return {
      success: true,
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
        success: false,
      };
    }

    return {
      success: true,
      result: rows,
    };
  } catch (e) {
    throw new Error(e);
  }
};
