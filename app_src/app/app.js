const app = require('electron').app;

app.name = 'PixijsRemoteHelper'
app.allowRendererProcessReuse = true

const appReadyListener = require('./app-ready.listener');
const appCloseListener = require('./app-close.listener');


app.on('ready', appReadyListener);
app.on('closed', appCloseListener);