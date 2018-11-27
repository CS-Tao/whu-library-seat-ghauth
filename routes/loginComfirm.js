var express = require('express');
var autherHelper = require('../helpers/auths');
var logger = require('../helpers/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 确认是否登录，用于本地存储 socketid
  var socketId = req.query.socketid;
  var device = req.query.device;
  if (socketid && device) {
    autherHelper.addSocketId(socketId, device)
    res.render('redict_to_auth', {
      title: '武汉大学图书馆抢座软件',
      socketId: socketId
    });
    return
  } else {
    logger.error('loginComfirm.js', '参数不足');
    res.render('auth_error', {
      title: '武汉大学图书馆抢座软件',
      status: 'Error!',
      statusColorClass: 'band-red',
      statusText: '错误信息：认证失败，参数不足',
      statusText2: '请打开软件尝试重新登录'
    })
  }
});

module.exports = router;
