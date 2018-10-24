/* eslint-disable */
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const devPort = 3000;
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    title: 'JMT',
    favicon: 'public/sample_favicon.png',
    template: path.resolve(process.cwd(), 'public/index.html'),
    inject: 'body',
  }),
  new OpenBrowserPlugin({ url: `http://localhost:${devPort}` })
];

console.log(`
-------------------------------
  ${chalk.blue(`Building ${chalk.green('bundle.js')} for: ${isProduction ? chalk.red('PROD') : chalk.red('DEV')}`)}
-------------------------------
`);

module.exports = {
  entry: {
    main: path.resolve(process.cwd(), 'src/index.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif)$/,
        use: [{ loader: 'file-loader?name=[name].[ext]' }],
      },
    ],
  },
  plugins: plugins,
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'module', 'main'],
    alias: {
      'components': path.resolve('./src/components'),
      'modules': path.resolve('./src/modules'),
      'actions': path.resolve('./src/actions'),
      'utils': path.resolve('./src/utils'),
      'reducers': path.resolve('./src/reducers'),
      'stores': path.resolve('./src/stores')
    }
  },
  devtool: isProduction ? '' : 'eval',
  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    port: devPort,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
}
