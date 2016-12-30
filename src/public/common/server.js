/**
 * Created by linxiaojie on 2016/12/30.
 */
var $ = require('jquery')
var status = require('./api').status
var timeout = 10 * 1000
var errMsg = '请求异常，请稍后再试'
function deal (options) {
  var deferred = new $.Deferred()
  $.ajax(options).done(function (res) {
    /*
     请求成功
     */
    if (res.status === status.OK) {
      deferred.resolve(res)
    } else if (res.status === status.UN_AUTHOR) {
      window.location.href = res.redirect
    } else {
      alert(errMsg)
      deferred.resolve(res)
    }
  }).fail(function () {
    alert(errMsg)
    deferred.reject()
  })
  return deferred
}
module.exports = {
  get: function (url) {
    return deal({
      url: url,
      cache: false,
      timeout: timeout,
      method: 'GET'
    })
  },
  post: function (url) {
    return deal({
      url: url,
      cache: false,
      dataType: 'json',
      timeout: timeout,
      method: 'POST'
    })
  }
}
