const electron = require('electron');
const url = require('url');
const path = require('path');
const server = require('../server/soket-server');

const { app, BrowserWindow, Menu, Tray } = electron;
const SOCKET_PORT = process.env.SOCKET_PORT || 3010;

let mainWindow,
  mainMenuTemplate;

app.on('ready', function () {

  server.listen(SOCKET_PORT);

  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'client', 'main.html'),
    icon: path.join(__dirname, 'assets', 'ico64x64.jpg'),
    protocol: 'file:',
  }));
  mainWindow.on('closed', function () {
    app.quit();
  });
  // mainWindow.webContents.openDevTools();

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);


  const appIcon = new Tray(path.join(__dirname, 'assets', 'ico64x64.jpg'));
});

app.on('closed', function () {
  mainWindow = null;
  server.stop();
  process.exit();
});

mainMenuTemplate = [{
  label: 'MixinPort'
}];