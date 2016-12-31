/**
 * Created by linxiaojie on 2016/12/30.
 */
require('less/rcs.less')
var $ = require('jquery')
var server = require('common/server')
var api = require('common/api').list
var status = require('common/api').status
var validate = require('common/validate')
var date = new Date()
var curDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
$(function () {
  var $pageContent = $('.page-content')
  var $applyContent = $('.apply-container')
  var $address = $('.js-address')
  var $reason = $('.js-reason')
  var $detail = $('.js-detail')
  var $startDate = $('.js-start-date')
  var $startTime = $('.js-start-time')
  var $endDate = $('.js-end-date')
  var $endTime = $('.js-end-time')

  /*
  设置时间控件语言
  */
  $.datetimepicker.setLocale('ch')
  $('.select-date').datetimepicker()

  /*
  * 设置开始/结束时间
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

  /*
  * 显示/关闭选择外出原因弹窗
  * */
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
  * 取消
  * */
  $('.js-apply-reason .js-cancel').on('click', function () {
    toggleReason()
  })

  /*
  * 填写事由，滑动到底部，防止键盘遮挡
  * */
  $('.js-detail').on('focus', function () {
    setTimeout(function () {
      $pageContent.scrollTop($applyContent.height() - $pageContent.height())
    }, 200)
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
    var billTitle = encodeURIComponent($detail.val().trim())
    var destination = encodeURIComponent($address.val().trim())
    var reasonType = encodeURIComponent($reason.html())
    var data = {
      destination: destination,
      reasonType: reasonType,
      outStartDate: $startDate.html(),
      outStartHour: $startTime.html(),
      outEndDate: $endDate.html(),
      outEndHour: $endTime.html()
    }
    /*
    * console.dir(data)
    * */
    /*
    * 数据校验
    * */
    var errMsg = validate.validate({
      destination: destination,
      reasonType: reasonType,
      billTitle: billTitle
    }, {
      destination: {
        type: 'required',
        message: '请填写外出地点'
      },
      reasonType: {
        type: 'required',
        message: '请选择外出原因'
      },
      billTitle: {
        type: 'required',
        message: '请选择外出事由'
      }
    })
    /*
    * 校验时间
    * */
    if (!errMsg) {
      var startDateTime = data['outStartDate'] + '' + data['outStartHour']
      var endDateTime = data['outEndDate'] + '' + data['outEndHour']
      if (!validate.compareDate(endDateTime, startDateTime)) {
        errMsg = '外出起始时间不能大于外出结束时间'
      }
    }
    if (errMsg) {
      alert(errMsg)
    } else {
      server.post(api.goout_request, {billTitle: billTitle, customData: data}).done(function (res) {
        if (res && res.result === status.OK) {
          alert('提交成功')
          return
        }
      })
    }
    $(this).removeClass('disabled')
  })
})

