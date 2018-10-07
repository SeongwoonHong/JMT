import * as express from 'express';

import * as routes from './routes';
class App {
  public express;

  constructor() {
    this.express = express();
    this.configure();
    this.routes();
  }

  private configure(): void {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json({ limit: '50mb' }));
  }

  private routes(): void {
    this.express.use('/api/helloworld', routes.HelloWorld);
    this.express.use('/api/user', routes.User);
  }
}

export default new App().express;
