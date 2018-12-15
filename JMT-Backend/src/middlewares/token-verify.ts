import {
  NextFunction,
  Response
} from 'express';

import * as jwtUtils from '@utils/jwt-utils';

export const tokenVerifyMiddleware = (req, res: Response, next: NextFunction): void => {
  const token = req.headers['x-access-token'] || req.header.cookie || req.query.token;

  if (!token) {
    res.status(403).json({
      msg: 'Not logged in',
      success: false,
    })
  }

  jwtUtils.verify(token)
    .then((decoded) => {
      // TODO: need to define a custom type for express request
      req.decoded = decoded;
      next();
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        msg: err.message,
      })
    })
};
