const app = require('electron').app;
const appReadyListener = require('./app-ready.listener');
const appCloseListener = require('./app-close.listener');

app.setName('PixijsRTools');

app.on('ready', appReadyListener);
app.on('closed', appCloseListener);