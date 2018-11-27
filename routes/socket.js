var express = require('express');
var autherHelper = require('../helpers/auths');
var logger = require('../helpers/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var socketId = req.query.socketid
  logger.log('socket.js', socketId)
  var token = autherHelper.getToken(socketId)
  if (token) {
    res.json({
      status: 'success',
      token: token,
      message: null
    })
  } else {
    res.json({
      status: 'failed',
      token: null,
      message: '未查询到记录'
    })
  }
});

module.exports = router;
