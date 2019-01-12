import * as jwt from 'jsonwebtoken';
import * as mailUtils from './mail-utils';

const {
  JWT_SECRET_KEY: secret,
  JWT_ISSUER: issuer,
} = process.env;

export const createToken = (payload: object, subject = '', expiresIn = '7d'): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
      expiresIn,
      issuer,
      subject
    }, (err, token: string) => {
      if (err) reject(err)
      resolve(token);
    });
  })
}

export const createEmailToken = (payload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
      expiresIn: '1d',
    }, (err, emailToken) => {
      if (err) reject(err)
      const url = `http://localhost:3000/email-verified?t=${emailToken}`;

      mailUtils.sendSignupVerificationMail(payload, url);
      resolve(emailToken);
    });
  })
}

export const verify = (token): Promise<{ email: string }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded);
    })
  })
}
