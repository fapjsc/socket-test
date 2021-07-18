import './App.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const App = () => {
  const [socketClient, setSocketClient] = useState(null);

  const socketConnect = () => {
    const socket = io.connect('http://192.168.11.128:8000');
    if (!socket) return;

    setSocketClient(socket);

    socket.on('connect', () => {
      console.log('socket connect');
    });

    socket.on('sendCamera', cameraId => {
      console.log(cameraId);
    });
  };

  useEffect(() => {
    socketConnect();
  }, []);

  useEffect(() => {
    if (!socketClient) return;
    socketClient.emit('createRoom', 'web2');
    socketClient.on('create-room-message', message => {
      console.log(message);
    });
  }, [socketClient]);

  return (
    <div className="App">
      <h1>web2</h1>
    </div>
  );
};

export default App;
