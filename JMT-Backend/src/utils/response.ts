import { Response } from 'express';

export const error = (res: Response, message: object | string, code: number = 500): Response => {
  if (typeof message !== 'object') {
    message = {
      success: false,
      message: (message || '').toString()
    };
  }
  return res.status(code).json(message);
};

export const success = (res: Response, data: object): Response => {
  return res.status(200).json(data);
};

export const redirect = (res: Response, url: string): Response => {
  res.redirect(url);
  return res;
};

export const forbidden = (res: Response, message: object | string): Response => {
  return error(res, message, 403);
};

export const notFound = (res: Response, message: object | string): Response => {
  return error(res, message, 404);
};
