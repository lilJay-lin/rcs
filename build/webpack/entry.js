/**
 * Created by linxiaojie on 2016/12/5.
 */
const path = require('path')
const dirVars = require('./dir_vars')
const pageArr = require('./page_entries.config');
const configEntry = {};

pageArr.forEach((page) => {
  configEntry[page] = path.resolve(dirVars.PAGE_PATH, page);
});

module.exports = configEntry;
