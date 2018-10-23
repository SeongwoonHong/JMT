import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';

import * as routes from './routes';
class App {
  public express;

  constructor() {
    this.express = express();
    this.configure();
    this.routes();
  }

  private configure(): void {
    const accessLogStream: fs.WriteStream = fs.createWriteStream(
      path.resolve('./src/logs/errors.log'),
      {
        flags: 'a'
      }
    );

    this.express.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
      skip: (req, res) => res.statusCode < 400,
      stream: accessLogStream
    }));
    this.express.use(morgan('dev'));
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json({ limit: '50mb' }));
  }

  private routes(): void {
    this.express.use('/api/user', routes.User);
    this.express.use('/api/restaurant', routes.Restaurant);
  }
}

export default new App().express;
