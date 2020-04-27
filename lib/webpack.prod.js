
const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const merge = require('webpack-merge');
const baseConfig =require('./webpack.base')
const config = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.[chunkhash:8].js' ,
        chunkFilename: '[name].[chunkhash:8].js',
    },
    mode:'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/index.[contenthash:8].css',
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new OptimizeCssPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
        }),
    ],

    devtool: 'none',
}

module.exports = merge(baseConfig,config);
