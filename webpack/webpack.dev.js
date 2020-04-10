const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.base');

const webpackDev = webpackMerge(webpackBase, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: 1337,
    overlay: true,
    contentBase: webpackBase.externals.paths.dist,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
});

module.exports = new Promise((resolve) => resolve(webpackDev));
