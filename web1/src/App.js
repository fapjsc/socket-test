import './App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const App = () => {
  const [socketClient, setSocketClient] = useState(null);

  const handleSocketConnect = () => {
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
    handleSocketConnect();
  }, []);

  useEffect(() => {
    if (!socketClient) return;

    socketClient.emit('createRoom', 'web1');
    socketClient.on('create-room-message', message => {
      console.log(message);
    });

    // socketClient.on('sendCamera', cameraId => {
    //   console.log(cameraId);
    // });
  }, [socketClient]);

  return (
    <div className="App">
      <h1>web1</h1>
    </div>
  );
};

export default App;
