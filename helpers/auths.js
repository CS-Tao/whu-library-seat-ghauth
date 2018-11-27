var Axios = require('axios').default;
var logger = require('./logger')

const client_id = '3aac81850b4e715b22e8';
const client_secret = process.env.WHU_SEAT_CLIENT_SCERET;

logger.log('auth', 'client_id：' + client_id)
logger.log('auth', 'client_secret：' + client_secret)

// 初始化
global.auths = [];

// 每十分钟检测一次 socketId 是否有效
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

function addSocketId (socketId, device) {
  for (var i = 0; i < global.auths.length; i++) {
    if (global.auths[i].socketId === socketId) {
      logger.log('addSocketId', '移除 ' + i)
      logger.log('addSocketId', '内容 ' + JSON.stringify(global.auths[i]))
      global.auths.splice(i, 1);
      i--;
    }
  }
  logger.log('addSocketId', '添加 socketId ' + socketId)
  logger.log('addSocketId', '设备 ' + device)
  logger.log('addSocketId', '当前共有 ' + global.auths.length)
  global.auths.push({
    socketId: socketId,
    token: null,
    device: device,
    initTime: Date.now()
  });
}

function queryToken (code) {
  return new Promise((resolve, reject) => {
    logger.log('queryToken', '请求 Token')
    logger.log('queryToken', '当前共有 ' + global.auths.length)
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
          reject(Error('获取 GitHub auth token 失败'))
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function addToken (socketId, token) {
  logger.log('addToken', '添加 token，记录 socketId ' + socketId)
  logger.log('addToken', '当前共有 ' + global.auths.length)
  var index = global.auths.findIndex(item => item.socketId === socketId)
  if (index !== -1) {
    global.auths[index].token = token;
    return true;
  } else {
    return false;
  }
}

function getToken (socketId) {
  logger.log('getToken', '返回 Token ，记录 socketId ' + socketId)
  var index = global.auths.findIndex(item => item.socketId === socketId)
  if (index !== -1) {
    return global.auths[index].token;
  } else {
    return false;
  }
}

module.exports = {
  addSocketId, queryToken, addToken, getToken
};
