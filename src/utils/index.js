/**
 * @description 空函数
 */
export function noop () { }

/**
 * @description 时间格式化
 * @default 默认格式化为 2018-01-01 12:00:00
 */
export function formatTime (value, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let time = new Date(value)
  let obj = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in obj) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? obj[k] : ('00' + obj[k]).substr(('' + obj[k]).length))
    }
  }

  return fmt
}

/**
 * 数字格式化
 * @param number {number} 原始数据
 * @param decimals {number} 小数位数，可选参数，默认是2
 * @param decPoint {string} 整数与小数之间分隔符, 可选参数，默认是'.'
 * @param thousandsSep {string} 千分符，可选参数，默认是','
 * @returns {string} 格式化后的数字
 */
export function numberFormat (number, decimals = 0, decPoint, thousandsSep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s
  const toFixedFix = function (x, y) {
    var k = Math.pow(10, prec)
    return '' + (Math.round(x * k) / k).toFixed(y)
  }
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * @description 将url上的参数转化为对象
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
  )
}
