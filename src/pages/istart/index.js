/**
 * Created by linxiaojie on 2016/12/28.
 */
require('less/rcs.less')
var $ = require('jquery')
var server = require('common/server')
var util = require('common/util')
var api = require('common/api').list
var status = require('common/api').status
var none = require('../_ejs/none.ejs')

/*
* 页面加载完成开始逻辑
* */
$(function () {
  var $cnt = $('.goout-container')
  /*
   * 检查是否还有数据显示
   * */
  function check () {
    if ($cnt.find('.goout-item').length === 0) {
      $cnt.html(none({}))
    }
  }

  /*
  * 加载数据
  * */
  server.post(api.istart, {operationType: '1'}).done(function (res) {
    if (res && res.result === status.OK && res.items) {
      var items = res.items
      if (items.length > 0) {
        $cnt.html(util.renderArray($('#goout-item-tpl').html(), items))
        return
      }
      check()
    }
  })
})

