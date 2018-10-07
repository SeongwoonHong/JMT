import { Response } from 'express';

import db from '../../database'
import UserQuery from '../../database/repositories/user/queries';

export const getAll = (req, res: Response): void => {
  const query = new UserQuery();

  db.query(query.getAllUsersQuery()).then(result => res.send(result.rows));
};

export const signup = (req, res: Response): void => {
  const { display_name, password, email } = req.body;
  const query = new UserQuery({ display_name, password, email })

  if (!display_name || !password || !email) {
    res.send({
      msg: 'Signup Error'
    });
  }

  db.query(query.signUpQuery())
    .then(result => res.send(result));
}

export const removeById = (req, res: Response): void => {
  const { user_id } = req.body;
  const query = new UserQuery({ user_id });

  if (!user_id) {
    res.send({
      msg: 'Id is not provided'
    });
  }

  db.query(query.removeByIdQuery()).then(result => res.send(result));
}

export const removeByEmail = (req, res: Response): void => {
  const { email } = req.body;
  const query = new UserQuery({ email });

  if (!email) {
    res.send({
      msg: 'Email is not provided'
    });
  }

  db.query(query.removeByEmailQuery()).then(result => res.send(result));
}
