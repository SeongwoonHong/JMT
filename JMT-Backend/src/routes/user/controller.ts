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
    const token = await jwtUtils.verify(req.params.t);
    userRepository.updateEmailVerifiationByEmail(token);

    return res.redirect(`http://localhost:3000/email-verified?t=${req.params.t}`);
  } catch (e) {
    return res.status(400).json({
      msg: 'Invalid token',
      success: false,
    });
  }
}


export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { displayName, password, email, avatar } = req.body;
  const schema = Joi.object().keys({
    displayName: validationUtils.isDisplayName,
    password: validationUtils.isPassword,
    email: validationUtils.isEmail,
    avatar: validationUtils.isAvatar,
  });
  let hashedPassword: string = null;
  const result: any = Joi.validate({ displayName, password, email, avatar }, schema);

  if (result.error) {
    return res.status(400).json({
      msg: result.error.details[0].message,
      success: false,
    })
  }

  try {
    hashedPassword = await bcryptUtils.hash(password);

    const userRes = await userRepository.getUserByEmailOrDisplayName({ displayName, email });

    if (userRes.success) {
      const result = userRepository.signup({ displayName, password, hashedPassword, email, avatar })

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
      msg: result.error.details[0].message,
      success: false,
    })
  }

  try {
    const userRes = await userRepository.login({ email, password });

    if (!userRes.success) {
      return res.status(400).json(userRes);
    }

    const { userId, displayName, avatar, signupDate } = userRes.result;

    const token = await creatToken({
      email,
      displayName,
      signupDate,
    })

    return res.json({
      success: true,
      token,
      userId: userId,
    })
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e.message);
  }
}

export const check = async (req, res: Response) => {
  try {
    const userRes = await userRepository.checkLogin(req.decoded.email);
    const userData = {
      email: req.decoded.email,
      avatar: req.decoded.avatar,
      signupDate: req.decoded.signupDate,
    };

    return res.json({
      success: true,
      userData: {
        ...userData,
        token: req.token,
        userId: userRes.result.userId,
        verified: userRes.result.verified,
        avatar: userRes.result.avatar,
      }
    });
  } catch (e) {
    return res.status(400).json(e.message);
  }
}

const creatToken = (fields) => {
  return jwtUtils.createToken(fields);
}

export const updateProfile = async (req, res: Response) => {
  const { email, displayName, password, avatar } = req.body;
  const schema = Joi.object().keys({
    email: validationUtils.isEmail,
    password: validationUtils.isPassword,
    displayName: validationUtils.isDisplayName,
    avatar: validationUtils.isAvatar,
  });
  const result: any = Joi.validate({ email, displayName, password, avatar }, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error,
      success: false,
    })
  }

  try {
    const userRes = await userRepository.updateUserProfile({ email, displayName, password, avatar });
    
    if (!userRes.success) {
      return res.status(400).json(userRes);
    }

    return res.json({
      success: true
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e.message);
  }
};
