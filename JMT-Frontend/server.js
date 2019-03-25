/* eslint-disable */
const express = require('express');
const proxy = require('http-proxy-middleware');
const chalk = require('chalk');
const path = require('path');

const PORT = 3000;
const app = express();

app.use('/api', proxy({
  target: `http://${process.env.API_PROXY || 'localhost:5000'}`,
  changeOrigin: false,
}));

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist/index.html')));

app.listen(PORT, () => console.log(`
-----------------------------------
  ${chalk.blue(`NODE_ENV = ${process.env.NODE_ENV}`)}
  ${chalk.blue(`API_PROXY = ${process.env.API_PROXY || 'localhost:5000'}`)}

  ${chalk.green(`Server started at localhost:${PORT}`)}
-----------------------------------
`));
