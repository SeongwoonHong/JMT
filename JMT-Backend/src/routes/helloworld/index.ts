import { Router } from 'express';

class HelloWorld {
  public router: Router;

  constructor() {
    this.router = Router();
    this.helloworld();
  }

  private helloworld() {
    this.router.get('/', (req, res) => {
      res.send({ msg: 'Hello World' })
      console.log('hello world!')
    });
  }
}

export default new HelloWorld().router;
