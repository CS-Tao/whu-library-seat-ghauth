var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 返回取消认证的页面
  res.render('auth_error', {
    title: '武汉大学图书馆抢座软件',
    status: 'Canceled!',
    statusColorClass: 'band-yellow',
    statusText: '登录已取消',
    statusText2: '请打开软件查看'
  })
});

module.exports = router;
