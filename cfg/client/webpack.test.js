var path = require('path');
var srcPath = path.join(__dirname, '../../src/');

module.exports = {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [
          path.join(__dirname, '../../src/'),
          path.join(__dirname, '../../test')
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      helpers: path.join(__dirname, '../../test/helpers'),
      actions:    srcPath + '/common' + '/actions/',
      components: srcPath + '/common' + '/components/',
      containers: srcPath + '/common' + '/containers/',
      routes:     srcPath + '/common' + '/routes/',
      reducers:   srcPath + '/common' + '/reducers/',
      styles:     srcPath + '/common' + '/styles/',
      images:     srcPath + '/common' + '/images/',
      lib:        srcPath + '/common' + '/lib/',
      icons:      srcPath + '/common' + '/components/icons/'
    }
  }
};
