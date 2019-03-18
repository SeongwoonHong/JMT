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

export const getGroupsByRestaurantAvailable = async (req, res: Response) => {
  const { restaurantId } = req.query;

  try {
    const result = await groupRepository.getGroupsByRestaurantAvailable(
      restaurantId
    );

    return res.json(result);
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
};

export const getGroupsByUser = async (req, res: Response) => {
  const { userId } = req.decoded;

  try {
    const result = await groupRepository.getGroupsByUser(userId);

    return res.json(result);
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
};

export const checkUserGroup = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const result = await groupRepository.checkUserGroup(id);

    return res.json(result);
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
};
