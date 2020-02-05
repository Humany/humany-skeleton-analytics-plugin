const path = require('path');
module.exports = (function () {
  return {
    contentBase: path.resolve(__dirname, '/public'),
    watchContentBase: true,
    hot: true,
  };
})();
