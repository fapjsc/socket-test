import './App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const App = () => {
  const [socketClient, setSocketClient] = useState(null);

  const socketHandler = () => {
    const socket = io.connect('http://192.168.11.128:8000');
    if (!socket) return;

    setSocketClient(socket);
    socket.on('connect', () => {
      console.log('socket connect');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
    });
  };

  const goToRoom = (room, cameraId) => {
    if (!socketClient) return;
    socketClient.emit('joinRoom', room, cameraId);
  };

  useEffect(() => {
    socketHandler();
  }, []);

  useEffect(() => {
    if (!socketClient) return;
  }, [socketClient]);

  return (
    <div className="App">
      <h1>Client</h1>
      <button onClick={() => goToRoom('web1', '1234')}>web1</button>
      <button onClick={() => goToRoom('web2', 'abcd')}>web2</button>
    </div>
  );
};

export default App;
