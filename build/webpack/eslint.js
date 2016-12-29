/**
 * Created by linxiaojie on 2016/12/5.
 */
const path = require('path')
const dirVars = require('./dir-vars')
module.exports = {
  configFile: path.resolve(dirVars.ROOT_PATH, './.eslintrc'),
  failOnWarning: true,
  failOnError: true,
  cache: true,
}