/**
 * Created by linxiaojie on 2016/12/30.
 */
require('less/rcs.less')
var $ = require('jquery')
var $address = $('.js-address')
var $reason = $('.js-reason')
var $detail = $('.js-detail')
var $startDate = $('.js-start-date')
var $startTime = $('.js-start-time')
var $endDate = $('.js-end-date')
var $endTime = $('.js-end-time')
var date = new Date()
var curDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
$(function () {
  /*
  设置时间控件语言
  */
  $.datetimepicker.setLocale('ch')
  $('.select-date').datetimepicker()

  /*
  * 开始时间
  * */
  $('.js-start-datetime').on('change', function () {
    var $el = $(this)
    var val = $el.val()
    setDateTime(val, $startDate, $startTime)
  })
  $('.js-end-datetime').on('change', function () {
    var $el = $(this)
    var val = $el.val()
    setDateTime(val, $endDate, $endTime)
  })
  function setDateTime (val, $date, $time) {
    if (val && val.trim()) {
      var arr = val.split(/\s+/g)
      $date.html(arr[0].replace(/\//g, '-'))
      $time.html(arr[1])
    }
  }

  function toggleReason () {
    $('.mask').toggle()
  }
  /*
  * 初始化时间
  * */
  $startDate.html(curDate)
  $endDate.html(curDate)
  /*
  * 选中外出原因
  * */
  $('.js-apply-reason').on('click', function () {
    toggleReason()
  })

  /*
  * 确定选中外出原因
  * */
  $('.apply-reason-btns .active').on('click', function () {
    var value = $('.apply-reason-radio').find('input:checked').val()
    $reason.removeClass('select').html(value)
    toggleReason()
  })

  /*
  * 提交
  * */
  $('.apply-btn a').on('click', function () {
    var $el = $(this)
    if ($el.hasClass('disabled')) {
      return
    }
    $(this).addClass('disabled')
    var data = {
      address: encodeURIComponent($address.val().trim()),
      reason: $reason.html(),
      detail: encodeURIComponent($detail.val().trim()),
      'start-date': $startDate.html(),
      'start-time': $startTime.html(),
      'end-date': $endDate.html(),
      'end-time': $endTime.html()
    }
    console.log(JSON.stringify(data))
  })
})

