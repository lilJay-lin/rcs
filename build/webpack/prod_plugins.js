/**
 * Created by linxiaojie on 2016/12/5.
 */
const plugins = require('./plugins')
const webpack = require('webpack')
const prodConfig = require('./config')
const InjectJs = require('../plugins/injectJs')

/*加入其他公共js*/
plugins.push(new InjectJs({
  paths: prodConfig.build.injectJs
}))

plugins.push(new webpack.DefinePlugin({
  PRODUCTION: true
}))

plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))

module.exports = plugins