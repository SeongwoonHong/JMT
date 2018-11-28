import { Request, Response } from 'express';
import * as Joi from 'joi';

import * as userRepository from '@db/models/user/repositories';
import db from '@db/index'
import UserQuery from '@db/models/user/queries';
import * as bcryptUtils from '@utils/bcrypt-utils';
import * as validationUtils from '@utils/validation-utils';
import * as jwtUtils from '@utils/jwt-utils';
// TODO - how to properly handle errors (through the app)

export const emailVerification = async (req: Request, res: Response) => {
  try {
    const token = await jwtUtils.verify(req.params.token);

    userRepository.updateEmailVerifiationByEmail(token);
  } catch (e) {
    return res.status(400).json({
      msg: 'Invalid token',
      success: false,
    });
  }

  return res.redirect('http://localhost:3000/email-verified');
}


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

    const userRes = await userRepository.getUserByEmailOrDisplayName({ display_name, email });

    if (userRes.success) {
      const result = userRepository.signup({ display_name, password, hashedPassword, email, avatar })

      return res.json(result);
    }

    return res.status(400).json(userRes)
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
}

export const login = async (req, res: Response) => {
  const { email, password } = req.body;
  const schema = Joi.object().keys({
    email: validationUtils.isEmail,
    password: validationUtils.isPassword,
  });
  const result: any = Joi.validate({ email, password }, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error,
      success: false,
    })
  }

  try {
    const userRes = await userRepository.login({ email, password });

    if (!userRes.success) {
      return res.status(400).json(userRes);
    }

    const { display_name, avatar, signup_date } = userRes.result;

    const token = await creatToken({
      email,
      password,
      display_name,
      avatar,
      signup_date,
    })

    return res.json({
      msg: 'login is succees',
      success: true,
      token
    })
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e.message);
  }
}

export const check = (req, res: Response): void => {
  res.json({
    success: true,
    info: req.decoded
  });
}

const creatToken = (fields) => {
  return jwtUtils.createToken(fields);
}
