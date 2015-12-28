var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('../webpack.base');

var config = _.merge({
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '../../src/client/index')
  ],
  cache: true,
  devtool: 'sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ],
  module: {
    loaders: baseConfig.module.loaders
  }
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  exclude: /node_modules/,
  query: {
    plugins: [
      ["react-transform", {
        "transforms": [{
          "transform": "react-transform-hmr",
          "imports": ["react"],
          "locals": ["module"]
        }]
      }]
    ]
  }
});

module.exports = config;
