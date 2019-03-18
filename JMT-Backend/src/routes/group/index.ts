import { Router } from 'express';

import * as controllers from './controller';
import { tokenVerifyMiddleware } from '@middlewares/token-verify';

class Group {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/getGroup', controllers.getGroup);
    this.router.get(
      '/getGroupsByUser',
      tokenVerifyMiddleware,
      controllers.getGroupsByUser
    );
    this.router.get('/checkUserGroup', controllers.checkUserGroup);
    this.router.get('/getGroupsByRestaurant', controllers.getGroupsByRestaurant);
    this.router.get(
      '/getGroupsByRestaurantAvailable',
      controllers.getGroupsByRestaurantAvailable
    );
  };
}

export default new Group().router;
