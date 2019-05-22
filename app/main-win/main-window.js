const url = require('url');
const path = require('path');
const BrowserWindow = require('electron').BrowserWindow;
const mainMenuClosedListener = require('./main-menu-closed.listener');

const mainWindow = new BrowserWindow({});
mainWindow.loadURL(url.format({
  pathname: path.join(__dirname, 'client', 'main.html'),
  icon: path.join(__dirname, 'assets', 'ico64x64.jpg'),
  protocol: 'file:',
}));

module.exports = mainWindow;