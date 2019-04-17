import { Request, Response } from 'express';
import * as Joi from 'joi';
import * as userRepository from '@db/models/user/repositories';
import * as bcryptUtils from '@utils/bcrypt-utils';
import * as validationUtils from '@utils/validation-utils';
import * as jwtUtils from '@utils/jwt-utils';
import * as mailUtils from '@utils/mail-utils';
import axios from 'axios';
import s3 from '@utils/s3';
import * as uuid from 'uuid/v1';
// TODO - how to properly handle errors (through the app)

export const sendSignupEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;
  const schema = Joi.object().keys({
    email: validationUtils.isEmail
  });
  const validationResult = Joi.validate({ email }, schema);

  if (validationResult.error) {
    return res.status(400).json({
      msg: validationResult.error.details[0].message,
      success: false
    });
  }

  try {
    const payload = {
      email
    };
    const token = await jwtUtils.createToken(payload, 'signup');
    const url = `http://localhost:3000/signup?t=${token}`;

    mailUtils.sendSignupVerificationMail(payload, url);

    return res.json({
      success: true
    });
  } catch (e) {
    console.log(e);
    return res.json(400).json(e);
  }
};

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { displayName, password, email, profilePicture } = req.body;
  const schema = Joi.object().keys({
    displayName: validationUtils.isDisplayName,
    password: validationUtils.isPassword,
    email: validationUtils.isEmail
  });
  let hashedPassword: string = null;
  const result: any = Joi.validate({ displayName, password, email }, schema);

  if (result.error) {
    return res.status(400).json({
      msg: result.error.details[0].message,
      success: false
    });
  }

  try {
    hashedPassword = await bcryptUtils.hash(password);

    const userRes = await userRepository.getUserByEmailOrDisplayName({
      displayName,
      email
    });

    /**
     * when the user does not exist on our server
     */
    if (userRes.success) {
      let bucketObject;

      if (profilePicture) {
        bucketObject = await getPresignedUrlFromS3(email, profilePicture);

        await sendPresignedUrlWithFile(bucketObject.url, profilePicture);
      }

      const result = await userRepository.signup({
        displayName,
        password,
        hashedPassword,
        email,
        profilePicture: bucketObject ? bucketObject.key : ''
      });

      return res.json({
        result,
        url: bucketObject && bucketObject.url
      });
    }

    return res.status(400).json(userRes);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

/**
 * upload profile picture
 */
const getPresignedUrlFromS3 = async (email: string, profilePicture) => {
  const key = `${email}/${uuid()}.jpeg`;
  const { AWS_BUCKET: Bucket } = process.env;
  const type = profilePicture.split(';')[0].split('/')[1];

  try {
    const presignedUrl = await s3.getSignedUrl('putObject', {
      Bucket,
      Key: key,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    });

    return {
      url: presignedUrl,
      key
    };
  } catch (e) {
    console.log(e.message);
    return {
      success: false
    };
  }
};

const sendPresignedUrlWithFile = async (url: string, file) => {
  try {
    const type = file.split(';')[0].split('/')[1];
    const buffer = Buffer.from(
      file.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    const { YELP_API_KEY: yelpApiKey } = process.env;

    delete axios.defaults.headers['Authorization'];

    const result = await axios.put(url, buffer, {
      headers: {
        'Content-Type': `image/${type}`,
        'Content-Encoding': 'base64'
      }
    });

    axios.defaults.headers['Authorization'] = `Bearer ${yelpApiKey}`;

    return result;
  } catch (e) {
    console.log(e.message);
    throw new Error(e);
  }
};

export const login = async (req, res: Response) => {
  const { email, password } = req.body;
  const schema = Joi.object().keys({
    email: validationUtils.isEmail,
    password: validationUtils.isPassword
  });
  const result: any = Joi.validate({ email, password }, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error.details[0].message,
      success: false
    });
  }

  try {
    const userRes = await userRepository.login({ email, password });

    if (!userRes.success) {
      return res.status(400).json(userRes);
    }

    const { userId, displayName, profilePicture, signupDate } = userRes.result;
    const token = await jwtUtils.createToken({
      email,
      displayName,
      signupDate,
      userId
    });

    return res.json({
      success: true,
      token,
      userId: userId,
      displayName,
      email,
      profilePicture
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e.message);
  }
};

export const checkUser = async (req, res: Response) => {
  try {
    const userRes = await userRepository.getUserByEmail(req.decoded.email);

    const userData = {
      email: req.decoded.email,
      profilePicture: req.decoded.profilePicture,
      signupDate: req.decoded.signupDate
    };

    return res.json({
      success: true,
      userData: {
        ...userData,
        token: req.token,
        displayName: userRes.rows[0].displayName,
        profilePicture: userRes.rows[0].profilePicture,
        userId: userRes.rows[0].userId
      }
    });
  } catch (e) {
    return res.status(400).json(e.message);
  }
};

export const updateProfile = async (req, res: Response) => {
  const { displayName, password } = req.body;
  const schema = Joi.object().keys({
    password: validationUtils.isPassword,
    displayName: validationUtils.isDisplayName
  });
  const result: any = Joi.validate({ displayName, password }, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error,
      success: false
    });
  }
  let hashedPassword: string = null;
  const { email } = req.decoded;

  try {
    hashedPassword = await bcryptUtils.hash(password);

    const userRes = await userRepository.updateUserProfile({
      email,
      displayName,
      password: hashedPassword
    });

    if (!userRes.success) {
      return res.status(400).json(userRes);
    }

    return res.json({
      success: true,
      displayName
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e.message);
  }
};

export const sendResetPasswordEmail = async (req, res: Response) => {
  const { email } = req.body;
  const schema = Joi.object().keys({
    email: validationUtils.isEmail
  });
  const result: any = Joi.validate({ email }, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error,
      success: false
    });
  }

  try {
    const userData = await userRepository.getUserByEmail(email);

    if (!userData.success) {
      return res.status(400).json({
        success: false,
        msg: 'Account does not exist'
      });
    }
    const token = await jwtUtils.createToken({ email }, 'userInfo', '1d');
    const url = `http://localhost:3000/forgot-password?t=${token}`;

    mailUtils.sendResetPasswordMail(email, url);

    return res.json({
      success: true
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e.message);
  }
};

export const updatePassword = async (req, res: Response) => {
  const { password, token } = req.body;
  const schema = Joi.object().keys({
    password: validationUtils.isPassword
  });
  const result: any = Joi.validate({ password }, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error,
      success: false
    });
  }

  try {
    const decoded = await jwtUtils.verify(token);
    const hashedPassword: string = await bcryptUtils.hash(password);
    await userRepository.updatePassword({
      email: decoded.email,
      password: hashedPassword
    });

    return res.json({
      success: true
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e.message);
  }
};

export const verifyToken = async (req, res: Response) => {
  return jwtUtils
    .verify(req.query.token)
    .then(decoded => {
      // TODO: need to define a custom type for express request
      return res.json({
        success: true,
        decoded
      });
    })
    .catch(err => {
      return res.status(403).json({
        success: false,
        msg: err.message
      });
    });
};

export const updateProfilePicture = async (req, res: Response) => {
  const { email } = req.decoded;
  const { profilePicture } = req.body; //base64
  const { AWS_BUCKET: Bucket } = process.env;

  try {
    const userRes = await userRepository.getUserByEmail(email);
    const { profilePicture: currentProfilePicture, userId } = userRes.rows[0];
    let bucketObject;
    let params = {
      Bucket,
      Key: currentProfilePicture
    };

    await s3.deleteObject(params).promise();
    bucketObject = await getPresignedUrlFromS3(email, profilePicture);
    await sendPresignedUrlWithFile(bucketObject.url, profilePicture);
    await userRepository.updateProfilePicture({
      id: userId,
      profilePicture: bucketObject.key
    });

    return res.json({
      success: true,
      profilePicture: bucketObject.key
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e.message);
  }
};
