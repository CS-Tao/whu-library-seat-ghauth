var express = require('express');
var logger = require('../helpers/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var socketId = req.query.socketid
  var token = req.query.token
  if (socketId && token) {
    logger.log('setToken', `socketId：${socketId}`)
    const io = req.app.get('socketio');
    io.to(socketId).emit('token', token);
    res.json({
      status: 'success',
      message: null
    })
  } else {
    res.json({
      status: 'failed',
      message: '参数错误'
    })
  }
});

module.exports = router;
