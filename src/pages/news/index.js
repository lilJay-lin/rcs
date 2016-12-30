/**
 * Created by linxiaojie on 2016/12/28.
 */
require('less/rcs.less')
var $ = require('jquery')
var server = require('common/server')
var util = require('common/util')
var $cnt = $('.news-container')
var api = require('common/api').list
var status = require('common/api').status
var none = require('../_ejs/none.ejs')
/*
 * 检查是否还有数据显示
 * */
function check () {
  if ($cnt.find('.news-item').length === 0) {
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
  server.get(api.news).done(function (res) {
    if (res && res.status === status.OK && res.list) {
      var list = res.list
      if (list.length > 0) {
        $cnt.html(util.renderArray($('#news-item-tpl').html(), list))
        return
      }
      check()
    }
  })
})
