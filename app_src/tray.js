const path = require('path');
const Tray = require('electron').Tray;

const appTray = new Tray(path.join(__dirname, 'assets', 'ico64x64.jpg'));

module.exports = appTray;