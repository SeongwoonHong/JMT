import * as Joi from 'joi';
import { Request, Response } from 'express';

import * as commentsRepository from '@db/models/comments/repositories';
import * as responses from '@utils/response';
import { sendCommentReplyMail } from '@utils/mail-utils';

const { APP_URL } = process.env;

export const getAllComments = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    id: Joi.number().allow('', null),
    groupId: Joi.number().required(),
  });
  const validationResult = Joi.validate(req.query, schema);

  if (validationResult.error) {
    return res.status(400).json({
      msg: validationResult.error.details[0].message,
      success: false,
    });
  }

  try {
    const comments = await commentsRepository.getComments(req.query);
    return responses.success(res, comments.rows);
  } catch (error) {
    return responses.error(res, error);
  }
};

export const addNewComment = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    depth: Joi.number().required(),
    groupId: Joi.number().required(),
    message: Joi.string().required(),
    parentId: Joi.number().allow('', null),
    userId: Joi.number().required(),
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

    if (req.body.depth > 0 && req.body.parentId) {
      const { comment, user } = await commentsRepository.getComment(req.body.parentId);

      sendCommentReplyMail({
        email: user.email,
        replyFrom: user.displayName,
        commentUrl: `${APP_URL}/main/group?id=${req.body.groupId}#${comment.id}`,
      });
    }

    return responses.success(res, comments);
  } catch (error) {
    return responses.error(res, error);
  }
};
