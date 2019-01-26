import { Router } from 'express';

import * as controllers from './controller';

class User {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/getGroup', controllers.getGroup);
  };
}

export default new User().router;
