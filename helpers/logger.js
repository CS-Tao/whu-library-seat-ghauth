function log (stack, message) {
  console.log(`INFO | ${Date.now} | ${stack} : ${message}`)
}

function error (stack, message) {
  console.error(`ERROR | ${Date.now} | ${stack} : ${message}`)
}

module.exports = {
  log, error
};
