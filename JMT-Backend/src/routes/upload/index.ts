import { Router, Request, Response } from 'express';
import { tokenVerifyMiddleware } from '@middlewares/token-verify';
import * as controllers from './controller';

class User {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/profilePicture', tokenVerifyMiddleware, controllers.profilePictureUpload);
  }
}

export default new User().router;
