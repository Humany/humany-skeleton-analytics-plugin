const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      template: __dirname + '/public/index.html',
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
