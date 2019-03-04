import { Router } from 'express';

import * as controllers from './controller';

class Comments {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/', controllers.getAllComments);
    this.router.post('/', controllers.addNewComment);
  }
}

export default new Comments().router;
