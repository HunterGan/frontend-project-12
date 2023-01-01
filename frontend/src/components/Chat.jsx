// @ts-check

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import ChannelsBox from './ChannelsBox.jsx';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const Chat = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      // @ts-ignore
      const { data } = await axios.get(routes.usersPath(), { headers: auth.getAuthHeader() });
      const { messages, channels, currentChannelId } = data;
      console.log('messages and channels from server: ', messages, channels);
      dispatch(channelsActions.addChannels({ channels, currentChannelId }));
      dispatch(messagesActions.addMessages({ messages }));
    };
    fetchData();
  });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="border-end pt-5 px-0 bg-light" md={2} xs={4}>
          <ChannelsBox />
        </Col>
        <Col>MessagesBox</Col>
      </Row>
    </Container>
  );
};
export default Chat;
