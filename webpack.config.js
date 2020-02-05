const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (function () {
  const config = {};

  config.mode = 'development'

  config.entry = [__dirname + '/src/polyfills.js', __dirname + '/src/index.js'];

  config.output = {
    filename: 'humany.js',
    chunkFilename: 'humany-[name].js',
    path: __dirname + '/dist',
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'humany.css',
      chunkFilename: 'humany-[name].css',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ];

  config.module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { modules: false }]],
            plugins: [
              'babel-plugin-syntax-dynamic-import',
              'babel-plugin-transform-class-properties',
              'babel-plugin-transform-async-to-generator',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              precision: 8,
            },
          },
        ],
      },
    ],
  };

  return config;
})();
