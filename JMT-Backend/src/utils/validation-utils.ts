import * as Joi from 'joi';

export const isDisplayName = Joi.string().regex(/^[a-zA-Z0-9ㄱ-ㅎ가-힣]{4,20}/).required();

export const isPassword = Joi.string().min(6).max(20).required();

export const isEmail = Joi.string().email().required();

export const isprofilePicture = Joi.string().allow(null);
