import { Response } from 'express';

import db from '../../database'
import UserQuery from '../../database/repositories/user/queries';
import * as bcryptUtils from '../../utils/bcryptUtils';

export const getAll = (req, res: Response): void => {
  const query = new UserQuery();

  db.query(query.getAllUsersQuery()).then(result => res.send(result.rows));
};

export const getByEmail = (req, res: Response) => {
  const { email } = req.params;
  const query = new UserQuery({ email });

  db.query(query.getUserByEmail()).then(result => res.send(result.rows));
};

export const signup = async (req, res: Response): Promise<void> => {
  const { display_name, password, email } = req.body;
  const hashedPassword = await bcryptUtils.hash(password);
  const userQuery = new UserQuery({ display_name, password: hashedPassword, email })
  const findEmailQuery = new UserQuery({ email });
  const requiredFields = ['display_name', 'password', 'email'];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      res.status(400).json({
        msg: `${field} IS NOT PROVIDED`
      });
    }
  })

  db.query(findEmailQuery.getUserByEmail())
    .then(result => {
      if (result.rows.length) {
        res.status(400).json({
          msg: 'ALREADY EXIST ACCOUNT',
        });
      }

      db.query(userQuery.signUpQuery())
        .then(result => res.send(result));
    })
}

export const login = (req, res: Response) => {
  const { email, password } = req.body;
  const requiredFields = ['email', 'password'];
  const userQuery = new UserQuery({ email, password });
  
  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      res.status(400).json({
        msg: `${field} IS NOT PROVIDED`
      });
    }
  })

  db.query(userQuery.getUserByEmail())
    .then(async ({ rows }) => {
      if (!rows.length) {
        res.status(400).json({
          msg: 'NOT EXISTING ACCOUNT'
        })
      }

      const user: boolean = await bcryptUtils.compare(password, rows[0].password);

      if (user) {
        res.json({
          msg: 'LOGIN SUCCESS'
        })
      } else {
        res.json({
          msg: 'PASSWORD IS NOT CORRECT'
        })
      }
    })
}

export const removeById = (req, res: Response): void => {
  const { user_id } = req.body;
  const query = new UserQuery({ user_id });

  if (!user_id) {
    res.status(400).send({
      msg: 'Id IS NOT PROVIDED',
    });
  }

  db.query(query.removeByIdQuery()).then(result => res.send(result));
}

export const removeByEmail = (req, res: Response): void => {
  const { email } = req.body;
  const query = new UserQuery({ email });

  if (!email) {
    res.send({
      msg: 'Email IS NOT PROVIDED',
    });
  }

  db.query(query.removeByEmailQuery()).then(result => res.send(result));
}
