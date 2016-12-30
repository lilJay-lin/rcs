/**
 * Created by linxiaojie on 2016/12/30.
 */
var none = require('./none.ejs')
/*
 * 检查是否还有数据显示
 * */
function check (fn) {
  if (fn()) {
    $noneData.show()
  }
}
module.exports = {
  check: check
}