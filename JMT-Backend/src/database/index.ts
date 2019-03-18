import { Client } from 'pg';
import chalk from 'chalk';

class DataBase {
  public pg;

  constructor() {
    this.pg = new Client();
    this.pg
      .connect()
      .then(() =>
        console.log(`
-------------------------------
  ${chalk.blue('Database is connected')}
-------------------------------
    `)
      )
      .catch(e => {
        console.error('Database connection error', e.message);
        console.error(e.stack);
      });
  }

  public async executeSP(sp: string, parameters: object): Promise<any> {
    return new Promise<any>(async resolve => {
      let type: string;
      let statement: string = 'SELECT ';
      let params: string = '(';

      type = sp.split('_')[0];

      if (type === 'GET') {
        statement += `* FROM ${sp}`;
      } else {
        statement += sp;
      }

      if (typeof parameters !== 'object') {
        params += `'${parameters}'`;
      } else {
        Object.keys(parameters).forEach((p, i) => {
          if (!parameters[p]) {
            params += `NULL`;
          } else {
            params += `'${parameters[p]}'`;
          }
          if (i !== Object.keys(parameters).length - 1) {
            params += ',';
          }
        });
      }
      params += ')';
      statement += params;
      console.log(statement);

      return this.pg.query(statement).then(result => resolve(result));
    });
  }
}

export default new DataBase();
