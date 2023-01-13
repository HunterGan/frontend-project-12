import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';
import { Provider as Rollbar, ErrorBoundary } from '@rollbar/react';

import store from './slices/index.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import resources from './locales/index.js';

import { ActionsContext } from './contexts/index.js';
import App from './components/App.jsx';

export default async (socket) => {
  const acknowledge = (type, data) => new Promise((resolve, reject) => {
    socket.timeout(3000).volatile.emit(type, data, (err, response) => {
      if (err) {
        reject(err);
      } else if (response.status === 'ok') {
        resolve(response);
      }
      reject(err);
    });
  });
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const chatActions = {
    sendMessage: (data) => acknowledge('newMessage', data),
    createChannel: (data) => acknowledge('newChannel', data),
    renameChannel: (data) => acknowledge('renameChannel', data),
    removeChannel: (data) => acknowledge('removeChannel', data),
  };

  const rollbarConfig = {
    accessToken: 'b5ba6a7bcaa747d3b83d06cbfed2fc08',
    environment: 'testenv',
  };

  const dict = leoProfanity.getDictionary('ru');
  leoProfanity.add(dict);

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel({
      channelId: payload.id,
      channelName: payload.name,
    }));
  });
  const vdom = (
    <Rollbar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <ActionsContext.Provider value={chatActions}>
              <App />
            </ActionsContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </Rollbar>
  );

  return vdom;
};
