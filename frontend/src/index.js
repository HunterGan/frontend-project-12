import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import initChat from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const socket = io();
  const chat = await initChat(socket);
  root.render(<React.StrictMode>{chat}</React.StrictMode>);
};

app();
