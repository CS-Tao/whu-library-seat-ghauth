var express = require('express');
var autherHelper = require('../helpers/auths');
var logger = require('../helpers/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var guid = req.query.guid
  var token = req.query.token
  logger.log('setToken', `Guid：${guid}`)
  if (autherHelper.addToken(guid, token)) {
    if (token === 'cancel') {
      res.json({
        status: 'cancel',
        message: null
      })
    } else {
      res.json({
        status: 'success',
        message: null
      })
    }
  } else {
    res.json({
      status: 'failed',
      message: '会话已失效'
    })
  }
});

module.exports = router;
