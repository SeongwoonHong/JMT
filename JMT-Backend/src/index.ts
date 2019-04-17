import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';

import * as cors from 'cors';
import * as routes from './routes';

class App {
  public express;

  constructor() {
    this.express = express();
    this.configure();
    this.routes();
  }

  private configure(): void {
    fs.writeFileSync(path.resolve('./src/logs/errors.log'), '');

    // const whitelist = ['http://jmtelastic-env.2aassp2jzm.us-east-2.elasticbeanstalk.com', 'http://jmt-client.s3-website-us-east-1.amazonaws.com', 'http://localhost:3000'];
    // const corsOptions = {
    //   origin: function (origin, callback) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //       callback(null, true)
    //     } else {
    //       // console.log('origin = ', origin);
    //       callback(new Error('Not allowed by CORS'))
    //     }
    //   },
    //   allowedHeaders: ['Content-Type', 'Authorization']
    // };
    // this.express.use(cors(corsOptions));
    this.express.use(cors());

    const accessLogStream: fs.WriteStream = fs.createWriteStream(
      path.resolve('./src/logs/errors.log'),
      {
        flags: 'a'
      }
    );

    this.express.use(
      morgan(
        ':method :url :status :res[content-length] - :response-time ms [:date[web]] ',
        {
          skip: (req, res) => res.statusCode < 400,
          stream: accessLogStream
        }
      )
    );
    this.express.use(morgan('dev'));
    this.express.use(compression());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json({ limit: '50mb' }));
  }

  private routes(): void {
    this.express.use('/api/comments', routes.Comments);
    this.express.use('/api/user', routes.User);
    this.express.use('/api/restaurant', routes.Restaurant);
    this.express.use('/api/group', routes.Group);
  }
}

export default new App().express;
