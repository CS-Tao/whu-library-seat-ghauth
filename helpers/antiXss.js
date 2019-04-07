function validateDevice(device) {
  const devices = ['desktop', 'mobile']
  return devices.findIndex((item) => item === device) !== -1
}

function validateSocketId(socketId) {
  return /^([0-9a-zA-Z]|[-_.])+$/.test(socketId)
}

module.exports = {
  validateDevice,
  validateSocketId
}