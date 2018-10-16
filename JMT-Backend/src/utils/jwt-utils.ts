import * as jwt from 'jsonwebtoken';

const {
  JWT_SECRET_KEY: secret,
  JWT_ISSUER: issuer,
} = process.env;

export const sign = (payload: object): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
      expiresIn: '7d',
      issuer,
      subject: 'userInfo'
    }, (err, token: string) => {
      if (err) reject(err)
      resolve(token);
    });
  })
}

export const verify = (token): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded);
    })
  })
}
