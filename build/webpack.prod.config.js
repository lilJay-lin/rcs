/**
 * Created by linxiaojie on 2016/11/2.
 */
const util = require('./util')
const dirVars = require('./webpack/dir-vars')
const config = require('./webpack/config')
const baseConfig = require('./webpack.base.config')

module.exports = util.mergeOptions(baseConfig, {
    /*编译输出配置*/
    output: {
        /*页面存放根路径*/
        path: config.build.buildPath,
        /*静态资源编译路径, file-loader之类的静态静态资源会拼接这个路径作为访问地址*/
        publicPath: config.build.publicPath,
        /*输出的入口文件*/
        filename: util.assetsPath('js/[name].js'),
        /*入口文件内部webpack优化生产的文件*/
        chunkFilename: util.assetsPath('[id].chunk.js'),
    },
    /*插件配置*/
    plugins: require('./webpack/plugins'),

    /*定义全局变量: require('jquery')会返回window.jQuery*/
    externals: {
        'jquery': 'window.jQuery',
        'swiper': 'window.Swiper'
    }
});