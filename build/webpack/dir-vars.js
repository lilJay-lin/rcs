/**
 * Created by linxiaojie on 2016/12/5.
 */
const path = require('path')
const config = require('./config')
const pkg = require('../../package.json')
const moduleExports = {}
moduleExports.ROOT_PATH = path.resolve(__dirname, '../../')
moduleExports.SRC_PATH = path.resolve(moduleExports.ROOT_PATH, './src')

Object.defineProperty(moduleExports, 'PAGE_PATH', {
  get: function () {
    return path.join(this.ROOT_PATH, './src/pages')
  }
})

module.exports = moduleExports