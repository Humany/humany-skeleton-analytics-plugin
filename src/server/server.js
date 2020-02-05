const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const openport = require('openport');
const serverConfig = require('./server.config');
const webpackConfig = require('../../webpack.config.js');

openport.find(
  {
    startingPort: 3000,
    endingPort: 3100,
  },
  function (err, port) {
    if (err) {
      console.log(err);
      return;
    } else {
      const url = `http://localhost:${port}/`;

      webpackConfig.entry.unshift(
        `webpack-dev-server/client?${url}`,
        'webpack/hot/dev-server',
      );
      const compiler = webpack(webpackConfig);
      const server = new WebpackDevServer(compiler, serverConfig);

      server.listen(port);

      opn(url);
    }
  },
);
