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
    res.result = parseInt(res.result, 10)
    if (res.result === status.OK) {
      deferred.resolve(res)
    } else if (res.result === status.UN_AUTHOR) {
      window.location.href = res.error.authUrl
    } else {
      alert(errMsg)
      deferred.reject(res)
    }
  }).fail(function () {
    alert(errMsg)
    deferred.reject()
  })
  return deferred
}
module.exports = {
  get: function (url, data) {
    var obj = null
    if (data) {
      obj = data
    }
    return deal({
      url: url,
      data: obj,
      cache: false,
      timeout: timeout,
      method: 'GET'
    })
  },
  post: function (url, data) {
    /*
     eslint-disable no-undef
     */
    if (PRODUCTION === false) {
      return this.get(url, data)
    }
    var obj = null
    if (data) {
      obj = data
    }
    return deal({
      url: url,
      data: JSON.stringify(obj),
      cache: false,
      dataType: 'json',
      contentType: 'application/json',
      timeout: timeout,
      method: 'POST'
    })
  }
}
