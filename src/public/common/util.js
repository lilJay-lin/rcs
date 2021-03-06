/**
 * Created by linxiaojie on 2016/6/7.
 */
/* eslint-disable */
/*
 * native object reference
 */
var objectProto = Object.prototype
/*
 native method
 */
var hasOwnProperty = objectProto.hasOwnProperty
var toString = objectProto.toString
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
var getLength = property('length')
var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g
var RPAD = 'rpad'
var LPAD = 'lpad'

function isArrayLike (obj) {
  var length = getLength(obj);
  return typeof  length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
}

function property (key) {
  return function(obj){
    return obj == null ? obj : obj[key]
  }
}

function isObject (obj) {
  return toString.call(obj) === '[object Object]'
}

/*
 * 渲染，
 * param{html string} template,
 * param{obj} context
 * 根据传入String做变量替换，返回替换之后的字符串
 */
function render (template, context) {
  return template.replace(tokenReg, function (word, slash1, token, slash2) {
    if (slash1 || slash2) {
      return word.replace('\\', '')
    }

    var variables = token.replace(/\s/g, '').split('.'), currentObject = context, i, length, variable;

    for (i = 0, length = variables.length; i < length; ++i) {
      variable = variables[i];
      currentObject = currentObject[variable]
      if (currentObject === undefined || currentObject === null) return ''
    }
    return currentObject
  })
}

/*不处理多重内嵌的数组，只处理一元数组*/
function renderArray (template, arr) {
  if(arr == null || !isArrayLike(arr)){
    return template
  }
  var html = '', obj = {}
  each(arr, function(val, i){
    if(toString.call(arr[i]) == '[object Object]'){
      obj = arr[i]
      obj._order = i + 1
    }else{
      obj.value = arr[i]
      obj._order = i + 1
    }
    html += render(template, obj)
  })
  return html
}
/*
* 循环
* */
function each(obj, iteratee, context){
  var i , len;
  var cb = context == void 0 ? iteratee : proxy(iteratee, context);
  if(isArrayLike(obj)){
    for(i = 0, len = obj.length; i < len; i++){
      if (cb(obj[i], i, obj) === false) {
        break
      }
    }
  }else{
    var keys = Object.keys(obj), key;
    for(i = 0, len = keys.length; i < len; i++){
      key = keys[i];
      if(hasOwnProperty.call(obj, key)){
        if (cb(obj[key], key, obj) === false) {
          break
        }
      }
    }
  }
}
/*
* 函数代理
* */
function proxy (fn, context) {
  return function () {
    return fn.apply(context ? context : this, arguments)
  }
}

/*
* 补充字符串到指定长度
* */
function lpad (str, len, pad) {
  return repeat(LPAD, str, len, pad)
}
function rpad (str, len, pad) {
  return repeat(RPAD, str, len, pad)
}
function repeat (type, str, len, pad) {
  var l = getLength(str + '')
  if (l > len) {
    return str
  }
  var pads = repeatPad(pad, len - l + 1)
  return type === RPAD ? str + pads : pads + str
}
function repeatPad(pad, len) {
  var o = ''
  o = pad ? pad : '0'
  return new Array(len).join(o)
}


module.exports =  {
  property: property,
  each: each,
  proxy: proxy,
  isObject: isObject,
  queryParse: function (obj) {
    var str = '', u;
    this.each(obj, function (value, key) {
      if(value !== undefined && value !== null && value !== ''){
        u = key + '=' + encodeURIComponent(value)
        str += str === '' ?  u : ('&' + u)
      }
    })
    return str
  },
  formatQuery: function (str) {
    var obj = {};
    if(str.trim() === ''){
      return obj
    }
    var regex = /([^=]*)=(.*)$/i, arr = str.split('&');
    this.each(arr, function(value, key){
      var m = regex.exec(value)
      if(m && m.length > 2){
        obj[m[1]] = m[2] || ''
      }
    })
    return obj
  },
  resolve: function (url, obj) {
    var qryStr = this.queryParse(obj);
    return ~url.indexOf('?') ? (url  + '&' + qryStr) : (url + '?' + qryStr);
  },
  render: render,
  renderArray: renderArray,
  lpad: lpad,
  rpad: rpad,
  getDateTime: function () {
    var date = new Date();
    return date.getFullYear() + '-' + this.lpad((date.getMonth() + 1), 2) + '-' + this.lpad(date.getDate(), 2) + ' ' + this.lpad(date.getHours(), 2) + ':' + this.lpad(date.getMinutes(), 2)
  },
  getDate: function () {
    var date = new Date();
    return date.getFullYear() + '-' + this.lpad((date.getMonth() + 1), 2) + '-' + this.lpad(date.getDate(), 2)
  }
}
