import React from 'react';
import { Provider } from 'react-redux';

import store from './slices/index.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
/// import { selectors } from '../slices/usersSlice.js';

import { ActionsContext } from './contexts/index.js';
import App from './components/App.jsx';

export default async (socket) => {
  const ActionsProvider = ({ children }) => {
    const acknowledge = (response) => console.log('acknowledge is', response.status);
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const chatActions = {
      sendMessage: (data) => socket.emit('newMessage', data, acknowledge),
      createChannel: (data) => socket.emit('newChannel', data, acknowledge),
      renameChannel: (data) => socket.emit('renameChannel', data, acknowledge),
      removeChannel: (data) => socket.emit('removeChannel', data, acknowledge),
    };
    return (
      <ActionsContext.Provider value={chatActions}>
        {children}
      </ActionsContext.Provider>
    );
  };

  socket.on('newMessage', (payload) => {
    console.log('socket newMessage(payload): ', payload);
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    console.log('socket newChannel(payload): ', payload);
    store.dispatch(channelsActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    console.log('socket removeChannel(payload): ', payload);
    store.dispatch(channelsActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    console.log('socket renameChannel(payload): ', payload);
    store.dispatch(channelsActions.renameChannel({
      channelId: payload.id,
      channelName: payload.name,
    }));
  });
  const vdom = (
    <Provider store={store}>
      <ActionsProvider>
        <App />
      </ActionsProvider>
    </Provider>
  );

  return vdom;
};
