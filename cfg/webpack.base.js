var path = require('path');
var webpack = require('webpack');
var port = 8000;
var srcPath = path.join(__dirname, '../src');
var publicPath = '/assets/';

module.exports = {
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '../build/assets'),
    filename: 'app.js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css', '.sass'],
    alias: {
      actions:    srcPath + '/common' + '/actions/',
      components: srcPath + '/common' + '/components/',
      containers: srcPath + '/common' + '/containers/',
      routes:     srcPath + '/common' + '/routes/',
      reducers:   srcPath + '/common' + '/reducers/',
      styles:     srcPath + '/common' + '/styles/',
      images:     srcPath + '/common' + '/images/',
      lib:        srcPath + '/common' + '/lib/',
      icons:      srcPath + '/common' + '/icons/'
    }
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass?indentedSyntax']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.md/,
        loader: 'react-markdown'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|svg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
