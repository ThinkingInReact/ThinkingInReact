var fs = require('fs');
var baseConfig = require('./cfg/webpack.base');
var _ = require('lodash');
var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

nodeModules['./cfg/client/webpack.dev.js'] = 'commonjs ./cfg/client/webpack.dev.js';

var config = {
	entry: "./src/server/index.js",
	target: "node",
  devtool: 'sourcemap',
	output: {
		path: './',
		filename: "server.js",
		publicPath: 'assets',
		libraryTarget: "commonjs2"
	},
  externals: nodeModules,
  resolve: baseConfig.resolve,
  context: __dirname,
  node: {
    global: true,
    __filename: true,
    __dirname: true
  },
	module: {
		loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
      },
      {
        test: /\.md/,
        loader: 'react-markdown'
      }
    ]
	}
};

module.exports = config;
