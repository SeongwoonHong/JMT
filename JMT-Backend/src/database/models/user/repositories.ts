import db from '@db/index';
import * as dateUtils from '@utils/date-utils';
import * as jwtUtils from '@utils/jwt-utils';
import * as bcryptUtils from '@utils/bcrypt-utils';

import Query from './queries';

export const updateEmailVerifiationByEmail = (token: { email: string }) => {
  try {
    const { email } = token;

    Query.updateEmailVerifiationByEmailQuery(email);
  } catch (e) {
    throw new Error(e);
  }
}

export const getUserByEmailOrDisplayName = async ({ display_name, email }) => {
  try {
    const param = email ? email : display_name;
    const data = await Query.getUserByEmailOrDisplayNameQuery(param);
    const { rows } = data;

    if (rows.length) {
      let duplicate: string;

      if (rows[0].display_name === display_name) {
        duplicate = 'display_name';
      } else if (rows[0].email === email) {
        duplicate = 'email';
      }

      return ({
        msg: `${duplicate} already exists`,
        success: false,
      });
    }

    return ({
      success: true
    })
  } catch (e) {
    throw new Error(e);
  }
}

export const signup = async ({ display_name, password, hashedPassword, email, avatar }) => {
  try {
    const result = await Query.signUpQuery({ display_name, password: hashedPassword, email, avatar })

    sendVerificationEmail({
      display_name,
      password,
      email,
      avatar
    });

    return ({
      result,
      success: true
    })
  } catch (e) {
    throw new Error(e);
  }
}

export const login = async ({ email, password }) => {
  try {
    let passwordMatched: boolean = false;
    const userData = await Query.getUserByEmailQuery({ email });
    const { rows } = userData;

    if (!rows.length) {
      return ({
        msg: 'account does not exist',
        success: false,
      })
    }

    const { verified } = rows[0];

    passwordMatched = await bcryptUtils.compare(password, rows[0].password);

    if (!passwordMatched) {
      return ({
        success: false,
        msg: 'password is not correct',
      });
    }

    if (!verified) {
      return ({
        success: false,
        msg: 'Please verify your email',
      });
    }

    return ({
      result: rows[0],
      success: true,
    })
  } catch (e) {
    console.log('here you!')
    throw new Error(e);
  }
}

const sendVerificationEmail = (fields) => {
  return jwtUtils.createEmailToken(fields);
}
