import { Router, Request, Response } from 'express';
import * as controllers from './controller';
import { tokenVerifyMiddleware } from '@middlewares/token-verify';

class User {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/check', tokenVerifyMiddleware, controllers.check);
    this.router.get('/emailVerification/:t', controllers.emailVerification);
    this.router.post('/signUp', controllers.signup);
    this.router.post('/login', controllers.login);
    this.router.post('/updateProfile', tokenVerifyMiddleware, controllers.updateProfile);
  }
}

export default new User().router;
