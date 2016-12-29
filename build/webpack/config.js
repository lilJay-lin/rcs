/**
 * Created by linxiaojie on 2016/12/23.
 */
const pkg = require('../../package.json')
const dirVars = require('./dir-vars')
const path = require('path')
module.exports = {
  outputDirectory: '',
  baseDirectory: '',
  assetsSubDirectory: 'static',
  cssRelAssets: '../../',
  build: {
    buildPath: path.join(dirVars.ROOT_PATH, './dist/' + pkg.version),
    publicPath: './',
    injectJs: ['http://cdn.bootcss.com/jquery/1.11.2/jquery.js']
  },
  dev: {
    buildPath: path.join(dirVars.ROOT_PATH, './dist/'),
    publicPath: '/',
    port: 8080
  }
}