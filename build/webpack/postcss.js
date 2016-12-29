/**
 * Created by linxiaojie on 2016/12/5.
 */
const autoprefixer = require('autoprefixer')

module.exports = function () {
  return [autoprefixer({
    remove: false,
    browsers: [
      'ie >= 8',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 2.3',
      'bb >= 10']
  })]
}