/**
 * Created by linxiaojie on 2016/12/28.
 */
require('less/rcs.less')
var $ = require('jquery')
var server = require('common/server')
var util = require('common/util')
var $cnt = $('.goout-container')
var api = require('common/api').list
var status = require('common/api').status
var none = require('../_ejs/none.ejs')

/*
 * 检查是否还有数据显示
 * */
function check () {
  if ($cnt.find('.goout-item').length === 0) {
    $cnt.html(none({}))
  }
}

/*
* 页面加载完成开始逻辑
* */
$(function () {
  /*
  * 加载数据
  * */
  server.post(api.goout, {opertionType: '2'}).done(function (res) {
    if (res && res.result === status.OK && res.items) {
      var items = res.items
      if (items.length > 0) {
        $cnt.html(util.renderArray($('#goout-item-tpl').html(), items))
        return
      }
      check()
    }
  })
  /*
  * 审批通过
  * */
  $cnt.delegate('.goout-button', 'click', function () {
    var $el = $(this)
    var id = $el.data('id')
    server.post(api.resolve_goout, {processId: id, strApproveValue: 1}).done(function (res) {
      if (res && res.result === status.OK) {
        alert('审批成功')
        $el.closest('.goout-item').remove()
      }
      check()
    })
  })
})

