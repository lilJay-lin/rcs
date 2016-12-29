/**
 * Created by linxiaojie on 2016/12/5.
 */
const path = require('path')
const config = require('./config')
const dirVars = require('./dir-vars')

module.exports = {
  alias: {
    components: path.resolve(dirVars.SRC_PATH, './public/components'),
    layout: path.resolve(dirVars.SRC_PATH, './public/layout'),
    pages: path.resolve(dirVars.SRC_PATH, './pages/' + config.baseDirectory),
    common: path.resolve(dirVars.SRC_PATH, './public/common'),
    less: path.resolve(dirVars.SRC_PATH, './public/less'),
  },
  extentions: ['', '.js']
}