const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  // If webprovisions should be enabled or not
  const WEBPROVISIONS = env && env.webprovisions || false;

  const entryFile = WEBPROVISIONS ? 'index.js' : 'index.legacy.js';

  const template = WEBPROVISIONS 
    ? __dirname + '/public/index.html' 
    : __dirname + '/public/index.legacy.html';

  return {
    entry: [
      __dirname + '/src/polyfills.js',
      __dirname + '/src/' + entryFile,
    ],
    output: {
      filename: 'analytics-skeleton-plugin.js',
      path: __dirname + '/dist',
    },
    optimization:{
      minimize: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template,
      }),
      new webpack.DefinePlugin({
        'process.env.webprovisions': WEBPROVISIONS,
      }),
    ],
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: false }]
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }
        }
      ]
    }
  };
}
