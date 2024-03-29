import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useRollbar } from '@rollbar/react';

import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import ModalPage from './ModalPage.jsx';

import { actions as channelsActions } from '../slices/channelsSlice.js';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('channels.loading')}</span>
      </Spinner>
    </div>
  );
};

const ChatPage = () => {
  const { active } = useSelector((state) => state.modalsReducer);
  const { isSessionActive } = useSelector((state) => state.sessionReducer);
  const [isLoading, setLoading] = useState(isSessionActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  useEffect(() => {
    const fetchData = async () => {
      if (!isSessionActive) setLoading(true);
      try {
        const { data } = await axios.get(routes.usersPath(), { headers: auth.getAuthHeader() });
        dispatch(channelsActions.setInitialState(data));
        setLoading(false);
      } catch (e) {
        rollbar.error('Error fetching initialData', e);
        if (!e.isAxiosError) {
          toast.error(t('errors.unknownError'));
          return;
        }

        if (e.response?.status === 401) {
          auth.logOut();
          navigate(routes.login);
        } else {
          toast.error(t('errors.loadError'));
        }
      }
    };
    fetchData();
  }, [dispatch, auth, t, rollbar, navigate, isSessionActive]);

  return isLoading
    ? (<Loading />)
    : (
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
