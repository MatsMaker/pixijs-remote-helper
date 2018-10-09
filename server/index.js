const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('statik'));

const mixinRoomPrefix = 'mixin-';
const clientRoomPrefix = 'client-';

io.on('connection', function (socket) {

  console.log('join new user');

  socket.on(mixinRoomPrefix + 'rootContainer', (data) => {
    socket.broadcast.emit('client-rootContainer', data);
  });

});

server.listen(3000);

console.log("runnded");
