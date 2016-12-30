/**
 * Created by linxiaojie on 2016/12/30.
 */
var dev = {
  /*
   * 查询外出申请列表
   * */
  goout: '/static/goout.json',
  /*
   * 审批外出申请
   * */
  resolve_goout: '/static/resolve_goout.json?id=',
  /*
   * 我发起的
   * */
  istart: '/static/istart.json',
  /*
  * 新闻列表
  * */
  news: '/static/news.json'
}
var prod = {}

/*
 eslint-disable no-undef
 */
var list = PRODUCTION ? prod : dev
module.exports = {
  list: list,
  status: {
    OK: 1,
    UN_AUTHOR: 401
  }
}

