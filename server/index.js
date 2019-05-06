const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


const PORT = process.env.SOCKET_PORT || 3000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3010;


console.log(path.join(__dirname, 'statik'));
app.use(express.static(path.join(__dirname, '../statik')));
app.listen(PORT);

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

server.listen(SOCKET_PORT);

console.log(`open host:${PORT}/main.html in your browser`);
console.log(`socket port:${SOCKET_PORT}`);
