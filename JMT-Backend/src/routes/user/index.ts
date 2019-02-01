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
    this.router.get('/checkUser', tokenVerifyMiddleware, controllers.checkUser);
    this.router.post('/signUp', controllers.signup);
    this.router.post('/login', controllers.login);
    this.router.post('/updateProfile', tokenVerifyMiddleware, controllers.updateProfile);
    this.router.post('/sendResetPasswordEmail', controllers.sendResetPasswordEmail);
    this.router.post('/updatePassword', controllers.updatePassword);
    this.router.post('/sendSignupEmail', controllers.sendSignupEmail);
    this.router.get('/verifyToken', controllers.verifyToken);
    this.router.post('/updateProfilePicture', tokenVerifyMiddleware, controllers.updateProfilePicture);
  }
}

export default new User().router;
