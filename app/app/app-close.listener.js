const socketServer = require('../../server/socket-server');

function appCloseListener() {
  socketServer.stop();
  process.exit();
}

module.exports = appCloseListener;