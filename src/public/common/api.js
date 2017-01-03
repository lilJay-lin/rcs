/**
 * Created by linxiaojie on 2016/12/30.
 */
var dev = {
  /*
   * 查询外出申请列表
   * */
  goout: '/static/mock/goout.json',
  /*
   * 审批外出申请
   * */
  resolve_goout: '/static/mock/resolve_goout.json?id=',
  /*
   * 我发起的
   * */
  istart: '/static/mock/istart.json',
  /*
  * 新闻列表
  * */
  news: '/static/mock/news.json',
  /*
  提交外出申请
  * */
  goout_request: '/static/mock/goout_request.json'
}
var prod = {
  goout: '/workflow/billQuery',
  resolve_goout: '/workflow/billApprove',
  istart: '/workflow/billQuery',
  news: '/news/headLinesQuery',
  goout_request: '/workflow/billApply'
}

/*
 eslint-disable no-undef
 */
/*
 兼容开发和线上环境，编译时自动替换
* */
var list = PRODUCTION ? prod : dev
module.exports = {
  list: list,
  status: {
    OK: 1,
    UN_AUTHOR: 401
  }
}

