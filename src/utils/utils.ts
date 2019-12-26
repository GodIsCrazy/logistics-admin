import Vue from 'vue'
/**
 * @description 定义统一的时间处理函数
 * @param {Number} time 传入时间戳
 * @param {String} format 精确到具体什么格式 {Y,M,D,H,m,s} => {年，月，日，时，分，秒}
 * @param {String} Separator 分隔符,默认是'-'
 * @param returns {String} 返回正确的时间格式
 */
Vue.prototype.formatTime = function (time: any, format: any, Separator: any) {
  function patchPosition(v: any) {
    return v < 10 ? '0' + v : v
  }
  let Sep = Separator
  if (!Sep) {
    Sep = '-'
  }
  if (!time) return ''
  let date = new Date(time)
  let year = date.getFullYear()
  let month = patchPosition(date.getMonth() + 1)
  let day = patchPosition(date.getDate())
  let hour = patchPosition(date.getHours())
  let minute = patchPosition(date.getMinutes())
  let second = patchPosition(date.getSeconds())
  let newTime: any = ''
  switch (format) {
    case 'Y':
      newTime = year
      break
    case 'M':
      newTime = `${year}${Sep}${month}`
      break
    case 'D':
      newTime = `${year}${Sep}${month}${Sep}${day}`
      break
    case 'H':
      newTime = `${year}${Sep}${month}${Sep}${day} ${hour}`
      break
    case 'm':
      newTime = `${year}${Sep}${month}${Sep}${day} ${hour}:${minute}`
      break
    case 's':
      newTime = `${year}${Sep}${month}${Sep}${day} ${hour}:${minute}:${second}`
      break
    default:
      newTime = `${year}${Sep}${month}${Sep}${day} ${hour}:${minute}:${second}`
  }
  return newTime
}
