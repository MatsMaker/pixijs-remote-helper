const Menu = require('electron').Menu;
const socketServer = require('../../server/socket-server');

const SOCKET_PORT = process.env.SOCKET_PORT || 3010;

function appReadyListener() {
  require('../tray');
  
  socketServer.listen(SOCKET_PORT);

  const mainMenu = require('../main-menu');
  Menu.setApplicationMenu(mainMenu);

  require('../main-win/main-window');

}

module.exports = appReadyListener;