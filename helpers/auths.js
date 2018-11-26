var Axios = require('axios').default;
var logger = require('./logger')

const client_id = '3aac81850b4e715b22e8';
const client_secret = process.env.WHU_SEAT_CLIENT_SCERET;

logger.log('auth.js', 'client_id：' + client_id)
logger.log('auth.js', 'client_secret：' + client_secret)

// 初始化
global.auths = [];

// 每十分钟检测一次 guid 是否有效
setInterval(() => {
  for (var i = 0; i < global.auths.length; i++) {
    if (global.auths[i].initTime - (new Date()).getTime() < 10*60*1000) {
      logger.log('setInterval', '定时移除 ' + i)
      logger.log('setInterval', '内容 ' + JSON.stringify(global.auths[i]))
      global.auths.splice(i, 1);
      i--;
    }
  }
}, 10*60*1000);

function addGuid (guid, device) {
  for (var i = 0; i < global.auths.length; i++) {
    if (global.auths[i].guid === guid) {
      logger.log('addGuid', '移除 ' + i)
      logger.log('addGuid', '内容 ' + JSON.stringify(global.auths[i]))
      global.auths.splice(i, 1);
      i--;
    }
  }
  logger.log('addGuid', '添加 Guid ' + guid)
  logger.log('addGuid', 'devive ' + device)
  logger.log('addGuid', '当前共有 ' + global.auths.length)
  global.auths.push({
    guid: guid,
    token: null,
    device: device,
    initTime: Date.now()
  });
}

function queryToken (code) {
  return new Promise((resolve, reject) => {
    logger.log('addGuid', '请求 Token')
    logger.log('addGuid', '当前共有 ' + global.auths.length)
    Axios.get(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`)
      .then((response) => {
        if (response.status === 200) {
          var keyvalues = response.data.split('&')
          var access_token = null
          keyvalues.forEach(keyvalue => {
            let key = keyvalue.split('=')[0]
            let value = keyvalue.split('=')[1]
            if (key === 'access_token') {
              access_token = value
            }
          });
          if (access_token) {
            resolve(access_token)
          } else {
            var error = null
            var error_description = null
            keyvalues.forEach(keyvalue => {
              let key = keyvalue.split('=')[0]
              let value = keyvalue.split('=')[1]
              if (key === 'error') {
                error = value
              } else if (key === 'error_description') {
                error_description = value
                error_description = error_description.replace(/\+/g, ' ')
              }
            });
            reject(Error(`${error} | ${error_description}`))
          }
        } else {
          reject(Error('获取 GitHub 令牌失败'))
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function addToken (guid, token) {
  logger.log('addToken', '添加 token，记录 Guid ' + guid)
  logger.log('addToken', '当前共有 ' + global.auths.length)
  var index = global.auths.findIndex(item => item.guid === guid)
  if (index !== -1) {
    global.auths[index].token = token;
    return true;
  } else {
    return false;
  }
}

function getToken (guid) {
  logger.log('getToken', '返回 Token ，记录 Guid ' + guid)
  var index = global.auths.findIndex(item => item.guid === guid)
  if (index !== -1) {
    return global.auths[index].token;
  } else {
    return false;
  }
}

module.exports = {
  addGuid, queryToken, addToken, getToken
};
