
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.[contenthash:8].css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new OptimizeCssPlugin({
      assetNameRegExp: /\.css$/g,
      /* eslint-disable global-require */
      cssProcessor: require('cssnano'),
      /* eslint-enable global-require */
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 10, // 优先级
        },
        common: {
          test: /[\\/]common[\\/]/,
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: 5, // 优先级
        },

      },
    },
  },
  devtool: 'none',
};

module.exports = merge(baseConfig, config);
