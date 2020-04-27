
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');


const config = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-server.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {

        test: /.css$/,
        use: 'ignore-loader',
      },
      {

        test: /.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  mode: 'production',
  plugins: [

    new webpack.optimize.ModuleConcatenationPlugin(),

  ],

};

module.exports = merge(baseConfig, config);
