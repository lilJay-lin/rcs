/**
 * Created by linxiaojie on 2016/12/5.
 */
const plugins = require('./plugins')
const webpack = require('webpack')

plugins.push(new webpack.DefinePlugin({
  PRODUCTION: false
}))

plugins.push(new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'window.$': 'jquery',
}))

module.exports = plugins