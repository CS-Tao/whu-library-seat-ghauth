var Axios = require('axios').default;

const client_id = '3aac81850b4e715b22e8';
const client_secret = process.env.WHU_SEAT_CLIENT_SCERET;

console.log('client_id：' + client_id)
console.log('client_secret：' + client_secret)

// 初始化
global.auths = [];

// 每十分钟检测一次 guid 是否有效
setInterval(() => {
  for (var i = 0; i < global.auths.length; i++) {
    if (global.auths[i].initTime - (new Date()).getTime() < 10*60*1000) {
      console.log('定时移除 ' + i)
      console.log('内容 ' + JSON.stringify(global.auths[i]))
      global.auths.splice(i, 1);
      i--;
    }
  }
}, 10*60*1000);

function addGuid (guid) {
  for (var i = 0; i < global.auths.length; i++) {
    if (global.auths[i].guid === guid) {
      console.log('移除 ' + i)
      console.log('内容 ' + JSON.stringify(global.auths[i]))
      global.auths.splice(i, 1);
      i--;
    }
  }
  console.log('添加 Guid ' + guid)
  console.log('当前共有 ' + global.auths.length)
  global.auths.push({
    guid: guid,
    token: null,
    initTime: Date.now
  });
}

function queryToken (code) {
  return new Promise((resolve, reject) => {
    console.log('请求 Token')
    console.log('当前共有 ' + global.auths.length)
    Axios.get(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`)
      .then((response) => {
        console.log(JSON.stringify(response.data))
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
  console.log('添加 token，记录 Guid ' + guid)
  console.log('当前共有 ' + global.auths.length)
  var index = global.auths.findIndex(item => item.guid === guid)
  if (index !== -1) {
    global.auths[index].token = token;
    return true;
  } else {
    return false;
  }
}

function getToken (guid) {
  console.log('返回 Token ，记录 Guid ' + guid)
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
