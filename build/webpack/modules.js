/**
 * Created by linxiaojie on 2016/12/5.
 */
const util = require('../util')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const dirVars = require('./dir-vars')
const config = require('./config')

module.exports = {
  preLoaders: [{
    test: /\.js$/,
    loader: 'eslint',
    include: dirVars.SRC_PATH,
    exclude: [],
  }],

  loaders: [
    /*解析css*/
    {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss', {publicPath: config.cssRelAssets}),
    },
    {
      test: /\.less$/,
      /*include: []*/
      loader: ExtractTextPlugin.extract('css?minimize&importLoaders=1!postcss!less', {publicPath:  config.cssRelAssets})
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    /*加载图片*/
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 1000,
        name: util.assetsPath('img/[name].[ext]')
      }
    },
    {
      test: /\.html$/,
      loader: 'html',
    },
    {
      test: /\.ejs$/,
      loader: 'ejs',
    },
    /*字体*/
    {
      // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'file',
      query: {
        name: util.assetsPath('fonts/[name].[ext]')
      }
    }
  ]
}