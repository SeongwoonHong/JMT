import { Client } from 'pg';
import chalk from 'chalk';

class DataBase {
  public db;

  constructor() {
    this.db = new Client();
    this.db.connect()
    .then(() => 
    console.log(`
-------------------------------
  ${chalk.blue("Database is connected")}
-------------------------------
    `))
    .catch(e => {
      console.error('Database connection error', e.message);
      console.error(e.stack);
    })
  }
}

export default new DataBase().db;
