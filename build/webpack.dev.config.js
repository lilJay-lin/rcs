/**
 * Created by linxiaojie on 2016/11/2.
 */
const path = require('path')
const util = require('./util')
const dirVars = require('./webpack/dir-vars')
const config = require('./webpack/config')
const baseConfig = require('./webpack.base.config')
const pageArr = require('./webpack/page-entries.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
    baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

/*
* 插件定义
* */
const plugins = [
    new webpack.DefinePlugin({
        PRODUCTION: false
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin(util.assetsPath('css/[name].css'))
]

pageArr.forEach((page) => {
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(dirVars.PAGE_PATH, page + '/index.html'),
        chunks: [page],
        inject: true
    })
    plugins.push(htmlPlugin);
});

module.exports = util.mergeOptions(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    /*编译输出配置*/
    output: {
        /*页面存放根路径*/
        path: config.dev.buildPath,
        /*静态资源编译路径, file-loader之类的静态静态资源会拼接这个路径作为访问地址*/
        publicPath: config.dev.publicPath ,
        /*输出的入口文件*/
        filename: util.assetsPath('js/[name].js'),
        /*入口文件内部webpack优化生产的文件*/
        chunkFilename: util.assetsPath('[id].chunk.js'),
    },
    /*插件配置*/
    plugins: plugins
});