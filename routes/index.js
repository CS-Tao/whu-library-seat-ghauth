var express = require('express');
var autherHelper = require('../helpers/auths');
var logger = require('../helpers/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 返回取消认证的页面
  var cancel = req.query.cancel;
  if (cancel) {
    res.render('auth_error', {
      title: '武汉大学图书馆抢座软件',
      status: 'Canceled!',
      statusColorClass: 'band-yellow',
      statusText: '登录已取消',
      statusText2: '请打开软件查看'
    })
    return
  }
  // 中转，用于存储 guid
  var authguid = req.query.authguid;
  var device = req.query.device;
  if (authguid && device) {
    autherHelper.addGuid(authguid, device)
    res.render('redict_to_auth', {
      title: '武汉大学图书馆抢座软件',
      guid: authguid
    });
    return
  }
  // 获得 Code，请求 Token
  var code = req.query.code;
  if (code) {
    autherHelper.queryToken(code)
      .then((token) => {
        logger.log('index', 'token 是 ' + token);
        res.render('auth_success', {
          title: '武汉大学图书馆抢座软件',
          token: token
        });
      })
      .catch((error) => {
        logger.error('index', error.message);
        res.render('auth_error', {
          title: '武汉大学图书馆抢座软件',
          status: 'Failed!',
          statusColorClass: 'band-red',
          statusText: '错误信息：' + error.message,
          statusText2: '请打开软件尝试重新登录'
        });
      });
  } else {
    logger.error('index', '参数不足');
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
