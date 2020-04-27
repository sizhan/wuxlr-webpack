
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const getFiles = () => {
  const entrys = {};
  const htmlWebpackPlugins = [];
  const files = glob.sync(path.join(__dirname, './src/*/index.js'));
  // '/Users/wuxiaoliang/练习文件/webpack-3.29/src/Index/index.js'

  files.forEach((item) => {
    const itemArr = item.split('/index.js');
    const newArr = itemArr[0].split('/');
    const filename = newArr[newArr.length - 1];
    // const filename=item.match(/src\.*\/index\.js/);
    entrys[filename] = item;
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
    );
  });
  return {
    entrys,
    htmlWebpackPlugins,
  };
};
const { entrys, htmlWebpackPlugins } = getFiles();

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
              /* eslint-disable global-require */
              require('autoprefixer');
              /*  eslint-enable global-require */
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
              /* eslint-disable global-require */
              require('autoprefixer');
              /* eslint-enable global-require */
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
    new FriendlyErrorsWebpackPlugin(),

  ].concat(htmlWebpackPlugins),

  stats: 'errors-only',
};

module.exports = config;
