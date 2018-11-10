import db from '@db/index';
import * as dateUtils from '@utils/date-utils';
import * as jwtUtils from '@utils/jwt-utils';
import * as bcryptUtils from '@utils/bcrypt-utils';

import UserQuery from './queries';

export const updateEmailVerifiationByEmail = (token: { email: string }) => {
  try {
    const query = new UserQuery({ email: token.email });
  
    db.query(query.updateEmailVerifiationByEmail())
  } catch (e) {
    throw new Error(e);
  }
}

export const getUserByEmailOrDisplayName = async ({ display_name, email }) => {
  const userQuery = new UserQuery({ email, display_name });

  try {
    const data = await db.query(userQuery.getUserByEmailOrDisplayName())
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
  const userQuery = new UserQuery({ display_name, password: hashedPassword, email, avatar, signup_date: dateUtils.getDate() })

  try {
    const result = await db.query(userQuery.signUpQuery())

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
    const userQuery = new UserQuery({ email, password });
    let passwordMatched: boolean = false;
    const userData = await db.query(userQuery.getUserByEmail())
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
