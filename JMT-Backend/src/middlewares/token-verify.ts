import * as jwtUtils from '../utils/jwt-utils';

export const tokenVerifyMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  if (!token) {
    res.status(403).json({
      msg: 'Not logged in',
      success: false,
    })
  }

  jwtUtils.verify(token)
    .then((decoded) => {
      req.decoded = decoded;
      next();
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        msg: err.message,
      })
    })
}
