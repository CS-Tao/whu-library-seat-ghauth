var express = require('express');
var autherHelper = require('../helpers/auths');
var logger = require('../helpers/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 获得 Code，请求 Token
  var code = req.query.code;
  if (code) {
    autherHelper.queryToken(code)
      .then((token) => {
        logger.log('index.js', 'token 是 ' + token);
        res.render('auth_success', {
          title: '武汉大学图书馆抢座软件',
          token: token
        });
      })
      .catch((error) => {
        logger.error('index.js', error.message);
        res.render('auth_error', {
          title: '武汉大学图书馆抢座软件',
          status: 'Failed!',
          statusColorClass: 'band-red',
          statusText: '错误信息：' + error.message,
          statusText2: '请打开软件尝试重新登录'
        });
      });
  } else {
    logger.error('index.js', '参数不足');
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
