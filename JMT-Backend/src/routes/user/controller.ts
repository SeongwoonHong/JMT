import { Request, Response } from 'express';
import * as Joi from 'joi';

import db from '../../database'
import UserQuery from '../../database/repositories/user/queries';
import * as bcryptUtils from '../../utils/bcrypt-utils';
import * as validationUtils from '../../utils/validation-utils';
import * as jwtUtils from '../../utils/jwt-utils';
import * as dateUtils from '../../utils/date-utils';
// TODO - how to properly handle errors (through the app)

export const getAll = (req: Request, res: Response): void => {
  const query = new UserQuery();

  db.query(query.getAllUsersQuery())
    .then(result => res.send(result.rows))
    .catch(err => {
      console.log(err);
    });
};

export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { display_name, password, email, avatar } = req.body;
  const schema = Joi.object().keys({
    display_name: validationUtils.isDisplayName,
    password: validationUtils.isPassword,
    email: validationUtils.isEmail,
    avatar: validationUtils.isAvatar,
  });
  let hashedPassword: string = null;
  const result: any = Joi.validate({ display_name, password, email, avatar }, schema);

  if (result.error) {
    return res.status(400).json({
      msg: result.error,
      success: false,
    })
  }

  try {
    hashedPassword = await bcryptUtils.hash(password);
  } catch (e) {
    console.log(e);
  }

  const userQuery = new UserQuery({ display_name, password: hashedPassword, email, avatar, signup_date: dateUtils.getDate() })
  const findEmailQuery = new UserQuery({ email });

  return db.query(findEmailQuery.getUserByEmailOrDisplayName())
    .then(({ rows }) => {
      if (rows.length) {
        let duplicate: string;

        if (rows[0].display_name === display_name) {
          duplicate = 'display_name';
        } else if (rows[0].email === email) {
          duplicate = 'email';
        }

        return res.status(400).json({
          msg: `${duplicate} already exists`,
          success: false,
        });
      }

      return db.query(userQuery.signUpQuery())
        .then(result => res.send(result))
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })
}

export const login = (req, res: Response) => {
  const { email, password } = req.body;
  const userQuery = new UserQuery({ email, password });
  const schema = Joi.object().keys({
    email: validationUtils.isEmail,
    password: validationUtils.isPassword,
  });
  const result: any = Joi.validate({ email, password}, schema);
  let passwordMatched: boolean = null;

  if (result.error) {
    res.status(400).json({
      msg: result.error,
      success: false,
    })
  }

  db.query(userQuery.getUserByEmailOrDisplayName())
    .then(async ({ rows }) => {
      if (!rows.length) {
        res.status(400).json({
          msg: 'account does not exist',
          success: false,
        })
      }

      const { display_name, avatar, signup_date } = rows[0];

      try {
        passwordMatched = await bcryptUtils.compare(password, rows[0].password);
      } catch (e) {
        console.log(e);
      }

      if (passwordMatched) {
        getToken({
          email,
          password,
          display_name,
          avatar,
          signup_date,
        })
        .then((token) => {
          res.json({
            msg: 'login is succees',
            success: true,
            token
          })
        })
        .catch((err) => {
          res.status(403).json({
            success: false,
            msg: err.message
          })
        })
      } else {
        res.json({
          msg: 'password is not correct',
          success: false,
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
}

export const check = (req, res: Response): void => {
  res.json({
    success: true,
    info: req.decoded
  });
}

const getToken = (fields) => {
  return jwtUtils.sign(fields);
}
