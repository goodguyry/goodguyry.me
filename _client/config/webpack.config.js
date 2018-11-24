const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, '../../js/main'),
  },
  output: {
    path: path.join(__dirname, '../../_site/js'),
    publicPath: path.join(__dirname, '../../'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
