var Axios = require('axios').default;
var logger = require('./logger')

const client_id = '3aac81850b4e715b22e8';
const client_secret = process.env.WHU_SEAT_CLIENT_SCERET;

logger.log('auth', 'client_id：' + client_id)
// logger.log('auth', 'client_secret：' + client_secret)

function queryToken (code) {
  return new Promise((resolve, reject) => {
    logger.log('queryToken', '请求 Token')
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

module.exports = {
  queryToken
};
