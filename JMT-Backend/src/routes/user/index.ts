import { Router, Request, Response } from 'express';
import * as controllers from './controller';

class User {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/getAll', controllers.getAll);
    this.router.post('/signUp', controllers.signup);
    this.router.delete('/removeById', controllers.removeById);
    this.router.delete('/removeByEmail', controllers.removeByEmail);
  }
}

export default new User().router;
