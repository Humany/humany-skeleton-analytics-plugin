const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WEBPROVISIONS = false;

const template = WEBPROVISIONS 
  ? __dirname + '/public/index_wprov.html' 
  : __dirname + '/public/index.html';

module.exports = {
  entry: [
    __dirname + '/src/polyfills.js',
    __dirname + '/src/index.js',
  ],
  output: {
    filename: 'analytics-skeleton-plugin.js',
    path: __dirname + '/dist',
    
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
            ]
          }
        }
      }
    ]
  }
}
