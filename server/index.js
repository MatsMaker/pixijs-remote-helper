const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

console.log(path.join(__dirname, 'statik'));
app.use(express.static(path.join(__dirname, '../statik')));
app.listen(3030);

const mixinRoomPrefix = 'mixin-';
const clientRoomPrefix = 'client-';

io.on('connection', function (socket) {

  console.log('new connection');

  socket.on(mixinRoomPrefix + 'rootContainer', (data) => {
    socket.broadcast.emit(mixinRoomPrefix + 'rootContainer', data);
  });

  socket.on(clientRoomPrefix + 'updateItem', (data) => {
    socket.broadcast.emit(clientRoomPrefix + 'updateItem', data);
  });

  socket.on(mixinRoomPrefix + 'updateItem', (data) => {
    socket.broadcast.emit(mixinRoomPrefix + 'updateItem', data);
  });

  socket.on(clientRoomPrefix + 'selectItem', (data) => {
    socket.broadcast.emit(clientRoomPrefix + 'selectItem', data);
  });

  socket.on(mixinRoomPrefix + 'selectItem', (data) => {
    socket.broadcast.emit(mixinRoomPrefix + 'selectItem', data);
  });

});

server.listen(3000);

console.log("open host:3030/main.html in your browser");
