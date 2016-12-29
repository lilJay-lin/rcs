/**
 * Created by linxiaojie on 2016/12/26.
 */
const config = require('./webpack/config')

module.exports = {
  /*入口配置*/
  entry: require('./webpack/entry'),

  /*resolve别名配置*/
  resolve: require('./webpack/resolve'),

  /*文件加载模块配置*/
  module: require('./webpack/modules'),

  /*eslint编码规范*/
  eslint: require('./webpack/eslint'),

  /*postcss配置*/
  postcss: require('./webpack/postcss')
};