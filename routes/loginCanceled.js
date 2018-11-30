var express = require('express');
var logger = require('../helpers/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var socketId = req.query.socketid
  if (socketId) {
    logger.log('loginCanceled', `socketId：${socketId}`)
    const io = req.app.get('socketio');
    io.to(socketId).emit('cancel', socketId);
    // 返回取消认证的页面
    res.render('auth_error', {
      title: '武汉大学图书馆抢座软件',
      status: 'Canceled!',
      statusColorClass: 'band-yellow',
      statusText: '已取消登录',
      statusText2: '请打开软件查看'
    })
  } else {
    res.render('auth_error', {
      title: '武汉大学图书馆抢座软件',
      status: 'Error!',
      statusColorClass: 'band-red',
      statusText: '错误信息：取消失败，参数不足',
      statusText2: '请打开软件尝试重新登录'
    })
  }
});

module.exports = router;
