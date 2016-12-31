/**
 * Created by linxiaojie on 2016/12/31.
 */
var util = require('./util')
function formatDate (d) {
  return d ? d.replace(/[^\d]/g, '') : ''
}
module.exports = {
  required: function (val) {
    return val === 0 || val === false || !!val
  },
  compareDate: function (d1, d2) {
    var fd1 = formatDate(d1)
    var fd2 = formatDate(d2)
    return fd1 >= fd2
  },
  /*
  * @param {Object} data
  * @param {Object} config 校验配置 {属性：{type:校验类型，message:错误信息}}
  * */
  validate: function (data, config) {
    var res = ''
    var type = ''
    var me = this
    if (util.isObject(data) && util.isObject(config)) {
      util.each(data, function (val, key) {
        if (config[key]) {
          type = config[key]['type']
          if (me[type](val) === false) {
            res = config[key]['message']
          }
          return res === ''
        }
      })
    }
    return res
  }
}
