const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBase = require('./webpack.base');

const webpackProd = webpackMerge(webpackBase, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ],
});

module.exports = new Promise((resolve) => resolve(webpackProd));
