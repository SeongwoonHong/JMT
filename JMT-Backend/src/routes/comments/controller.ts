import * as Joi from 'joi';
import { Request, Response } from 'express';

import * as commentsRepository from '@db/models/comments/repositories';
import * as responses from '@utils/response';

export const getAllComments = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    id: Joi.number().allow('', null),
    groupId: Joi.number().allow('', null),
  });
  const validationResult = Joi.validate(req.query, schema);

  if (validationResult.error) {
    return res.status(400).json({
      msg: validationResult.error.details[0].message,
      success: false,
    });
  }

  const { id, groupId } = req.query;

  if (!id || !groupId) {
    return responses.badRequest(res);
  }

  try {
    const comments = await commentsRepository.getComments(req.query);
    return responses.success(res, comments.rows);
  } catch (error) {
    console.log(error);
    return responses.error(res, error);
  }
};

export const addNewComment = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    depth: Joi.number(),
    groupId: Joi.number(),
    message: Joi.string(),
    parentId: Joi.number().allow('', null),
    userId: Joi.number(),
  });
  const validationResult = Joi.validate(req.body, schema);

  if (validationResult.error) {
    return res.status(400).json({
      msg: validationResult.error.details[0].message,
      success: false,
    });
  }

  try {
    const comments = await commentsRepository.addNewComment(req.body);
    return responses.success(res, comments);
  } catch (error) {
    console.log(error);
    return responses.error(res, error);
  }
};
