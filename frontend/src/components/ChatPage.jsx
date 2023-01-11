// @ts-check

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';

import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import ModalPage from './ModalPage.jsx';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const ChatPage = () => {
  // @ts-ignore
  const { active } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // @ts-ignore
        const { data } = await axios.get(routes.usersPath(), { headers: auth.getAuthHeader() });
        const { messages, channels, currentChannelId } = data;
        /// Сделаю action setInitialState для каналов, эктра для сообщений
        dispatch(channelsActions.addChannels({ channels, currentChannelId }));
        dispatch(messagesActions.addMessages({ messages }));
      } catch (e) {
        rollbar.error('Error fetching initialData', e);
        toast.error(t('errors.loadError'));
      }
    };
    fetchData();
  }, [dispatch, auth, t, rollbar]);

  return (
    <>
      {active && <ModalPage />}
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col className="border-end pt-5 px-0 bg-light" md={2} xs={4}>
            <ChannelsBox />
          </Col>
          <Col className="p-0 h-100">
            <MessagesBox />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ChatPage;
