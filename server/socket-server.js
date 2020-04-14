const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);

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

module.exports = socketServer;
