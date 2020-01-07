function formatDate (date, options) {
  options = options || {}
  options.sign = options.sign || 'yyyy/MM/dd - hh:mm:ss'
  var _complete = function (n) {
    return (n > 9) ? n : '0' + n
  }
  var year = date.getFullYear()
  var month = _complete(date.getMonth() + 1)
  var day = _complete(date.getDate())
  var hour = _complete(date.getHours())
  var minute = _complete(date.getMinutes())
  var second = _complete(date.getSeconds())
  var result = options.sign
  result = result.replace('yyyy', year)
  result = result.replace('MM', month)
  result = result.replace('dd', day)
  result = result.replace('hh', hour)
  result = result.replace('mm', minute)
  result = result.replace('ss', second)
  return result
}

function log (stack, message) {
  console.log(`INFO | ${formatDate(new Date())} | ${stack} : ${message}`)
}

function error (stack, message) {
  console.error(`ERROR | ${formatDate(new Date())} | ${stack} : ${message}`)
}

module.exports = {
  log, error
};
