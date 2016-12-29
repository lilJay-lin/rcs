/**
 * Created by linxiaojie on 2016/12/5.
 */
const path = require('path')
const util = require('../util')
const dirVars = require('./dir-vars')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InjectJs = require('../plugins/injectJs')
const pageArr = require('./page-entries.config.js');
const config = require('./config');
const COMMON_CHUNK_NAME = 'commons'
const configPlugins = [
  new webpack.DefinePlugin({
    PRODUCTION: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  /*提取公共代码*/
  new webpack.optimize.CommonsChunkPlugin({
    /*设置公共模块的chunk名称，唯一标识*/
    name: COMMON_CHUNK_NAME,
    /*生成文件名*/
    filename: util.assetsPath('js/[name].js'),
    /*chunks配置需要在哪些模块提取公共代码，不配置默认全部*/
    /*chunks: ['main', 'other'],*/
    /*至少多少个chunk使用才可以提取为公共代码*/
    minChunks: 2
  }),
  new InjectJs({
    paths: config.build.injectJs
  }),
  /*自动导入模块，页面上使用下面定义的变量时不需要require*/
  /*new webpack.ProvidePlugin({
   $: 'jquery',
   jQuery: 'jquery',
   'window.jQuery': 'jquery',
   'window.$': 'jquery',
   })*/
  /*提取css到文件*/
  //new ExtractTextPlugin(util.assetsPath('css/[name].css'))
  new ExtractTextPlugin(util.assetsPath('css/style.css'),{
    allChunks: true
  })
]


pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}.html`,
    template: path.resolve(dirVars.PAGE_PATH, page + '/index.html'),
    chunks: [page, COMMON_CHUNK_NAME],
    css: true,
    hash: true, // 为静态资源生成hash值
    xhtml: true,
    inject: 'body'
  })
  configPlugins.push(htmlPlugin);
});


module.exports = configPlugins