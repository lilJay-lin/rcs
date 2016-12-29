/**
 * Created by linxiaojie on 2016/12/5.
 */
const path = require('path')
const dirVars = require('./dir-vars')
const pageArr = require('./page-entries.config.js');
const configEntry = {};

pageArr.forEach((page) => {
  configEntry[page] = path.resolve(dirVars.PAGE_PATH, page);
});

module.exports = configEntry;
