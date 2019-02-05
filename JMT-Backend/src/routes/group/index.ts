import { Router } from 'express';

import * as controllers from './controller';
import { tokenVerifyMiddleware } from '@middlewares/token-verify';

class User {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/getGroup', controllers.getGroup);
    this.router.get('/getGroupsByUser', tokenVerifyMiddleware, controllers.getGroupsByUser);
  };
}

export default new User().router;
