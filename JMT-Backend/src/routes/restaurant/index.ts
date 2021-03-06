import { Router } from 'express';

import { tokenVerifyMiddleware } from '@middlewares/token-verify';
import * as controllers from './controller';

class User {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/getRestaurantDetail', controllers.getRestaurantDetail);
    this.router.get('/searchRestaurant', controllers.searchRestaurant);
    this.router.get('/getRestaurantAutoComplete', controllers.getRestaurantAutoComplete);
    this.router.post('/joinRestaurant', tokenVerifyMiddleware, controllers.joinRestaurant);
  }
}

export default new User().router;
