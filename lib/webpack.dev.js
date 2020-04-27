
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/index.[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
  },

};

module.exports = merge(baseConfig, config);
