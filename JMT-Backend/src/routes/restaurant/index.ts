import { Router, Request, Response } from 'express';
import * as controllers from './controller';

class User {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/getRestaurantNearby', controllers.getRestaurantNearby);
    this.router.get('/getRestaurantDetail', controllers.getRestaurantDetail);
    this.router.get('/searchRestaurant', controllers.searchRestaurant);
  }
}

export default new User().router;
