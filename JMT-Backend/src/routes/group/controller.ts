import { Request, Response } from 'express';

import * as groupRepository from '@db/models/group/repositories';

export const getGroup = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const result = await groupRepository.getGroup(id);

    return res.json(result);
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
};
