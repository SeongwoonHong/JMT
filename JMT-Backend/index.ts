require('dotenv').config();

import chalk from 'chalk';

const isProduction = process.env.NODE_ENV === 'production';

console.log(`
-------------------------------
  ${chalk.blue(`Building Express Server for: ${isProduction ? chalk.red('PROD') : chalk.red('DEV')}`)}
-------------------------------
`);

import app from './src';

const server = app.listen(process.env.PORT || 5000, (err: any) => {

  if (err) throw err;

console.log(`
  ${chalk.blue(`Completed! Express server listening on ${chalk.red(process.env.PORT || "5000")}`)}
-------------------------------
  `);
});

export default server;
