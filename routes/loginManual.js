var express = require('express');
var logger = require('../helpers/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var socketId = req.query.socketid
  if (socketId) {
    logger.log('loginManual', `socketId：${socketId}`)
    const io = req.app.get('socketio');
    io.to(socketId).emit('disconnect', socketId);
    // 返回手动认证的页面
    res.render('auth_manual', {
      title: '图书馆助手',
      status: 'Disconnect!',
      statusColorClass: 'band-yellow',
      statusText: '已主动和客户端断开连接，请您进入下方链接手动申请 Token 后粘贴到软件中',
      isMobile: req.query.device == 'mobile'
    })
  } else {
    res.render('auth_error', {
      title: '图书馆助手',
      status: 'Error!',
      statusColorClass: 'band-red',
      statusText: '错误信息：取消失败，参数不足',
      statusText2: '请打开软件尝试重新登录'
    })
  }
});

module.exports = router;
