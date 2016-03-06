var path = require('path');

module.exports = {
  cache: true,
  entry: {
    'index': './client/index.js',
  },
  output: {
    path: path.join(__dirname, 'server/public/javascripts/build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'client')
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'client')
    }],
    preLoaders: [{
      test: /\.js$|\.jsx$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: path.join(__dirname, 'client')
    }]
  },
}

