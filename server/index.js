const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('statik'));

io.on('connection', function (socket) {

  console.log('join new user');

  socket.on('rootContainer', (data) => {
    console.log('got data', data);
    // socket.broadcast.emit('rootContainer', {
    //   username: socket.username
    // });
  });

});

server.listen(3000);

console.log("runnded");
