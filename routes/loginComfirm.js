var express = require('express');
var logger = require('../helpers/logger');
var antiXss = require('../helpers/antiXss')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 确认是否登录，用于本地存储 socketid
  var socketId = req.query.socketid;
  var device = req.query.device;
  if (socketId && device && antiXss.validateDevice(device) && antiXss.validateSocketId(socketId)) {
    res.render('auth_comfirm', {
      title: '武汉大学图书馆抢座软件',
      socketId: socketId,
      device: device
    });
    return
  } else {
    logger.error('loginComfirm.js', '参数错误');
    res.render('auth_error', {
      title: '武汉大学图书馆抢座软件',
      status: 'Error!',
      statusColorClass: 'band-red',
      statusText: '错误信息：认证失败，参数错误',
      statusText2: '请打开软件尝试重新登录'
    })
  }
});

module.exports = router;
