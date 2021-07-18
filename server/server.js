const express = require('express');
const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server, {
  cors: { origin: '*' },
});

io.on('connection', socket => {
  console.log('socket is connection', socket.id);

  socket.on('createRoom', roomId => {
    console.log(socket.id, roomId);
    socket.join(roomId);
    socket.emit('create-room-message', `room: ${roomId} 已經建立`);
  });

  socket.on('joinRoom', (roomId, cameraId) => {
    socket.join(roomId);
    console.log(roomId, cameraId);
    io.to(roomId).emit('sendCamera', cameraId);
  });
});

server.listen(8000, () => console.log('server is listen on port 8000'));
