const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './App/index.js',
  output: {
    // path: '/dist',
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: 'node_modules',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },

      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
};
