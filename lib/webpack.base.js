
const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV == 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpackPlugin=require('friendly-errors-webpack-plugin')
console.log(process.env.NODE_ENV);
const getFiles = () => {
    const entrys = {};
    const htmlWebpackPlugins = [];
    const files = glob.sync(path.join(__dirname, './src/*/index.js'));
    // '/Users/wuxiaoliang/练习文件/webpack-3.29/src/Index/index.js'

    files.forEach((item) => {
        console.log(item);
        const itemArr = item.split('/index.js');
        const newArr = itemArr[0].split('/');
        const filename = newArr[newArr.length - 1];
        // const filename=item.match(/src\.*\/index\.js/);
        entrys[filename] = item;
        console.log([`${filename}`]);
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `./src/${filename}/index.html`),
                filename: `${filename}.html`,
                chunks: ['vendor', 'common', `${filename}`],
                title: `${filename}`,
                compile: true,
                inject: true,
                minify: {
                    html5: true,
                },
            }),
        )
    })
    return {
        entrys,
        htmlWebpackPlugins,
    }
}
const { entrys, htmlWebpackPlugins } = getFiles()

const config = {
    entry: entrys,
    module: {
        rules: [
            {
                test: /.(jsx|js)$/,
                use: ['babel-loader'],
            }, {

                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => {
                            require('autoprefixer')
                        },
                    },
                }],
            },
            {
                test: /.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => {
                            require('autoprefixer')
                        },
                    },
                }, {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75,
                        remPrecision: 8,
                    },
                }],
            },
            {
                test: /.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: 'static/images/[name].[hash:8].[ext]',
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin()

    ].concat(htmlWebpackPlugins),
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
    stats:'errors-only'
}

module.exports = config;
