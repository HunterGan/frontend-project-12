// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Dropdown, Nav, Button, ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalsSlice.js';

const ChannelsHeader = ({ addChannel }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('channels.channels')}</span>
      <button
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
        onClick={addChannel}
      >
        <PlusSquare size={20} />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );
};
// eslint-disable-next-line object-curly-newline
const Channel = ({ channel, isActive, handleActions }) => {
  const { t } = useTranslation();
  const variant = isActive ? 'secondary' : '';
  /// --- create removable or static channel ---
  return (
    <Nav.Item as="li" className="w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            variant={variant}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleActions.setActiveChannel(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle split className="flex-grow-0" variant={isActive && 'secondary'}>
            <span className="visually-hidden">{t('channels.manageChannel')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleActions.removeChannel(channel.id)}>
              {t('channels.delete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleActions.renameChannel(channel.id)}>
              {t('channels.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
        : (
          <Nav.Link
            onClick={handleActions.setActiveChannel(channel.id)}
            as="button"
            bsPrefix="btn"
            type="button"
            className={`w-100 rounded-0 text-start ${isActive && 'btn-secondary'}`}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Nav.Link>
        )}
    </Nav.Item>
  );
};

const ChannelsBox = () => {
  const dispatch = useDispatch();
  /// --- Create actions for handling actions of channels ---
  const handleActions = {
    setActiveChannel: (id) => () => dispatch(channelsActions.setActiveChannel({ id })),
    removeChannel: (id) => () => dispatch(modalActions.openModal({ type: 'remove', id })),
    renameChannel: (id) => () => dispatch(modalActions.openModal({ type: 'rename', id })),
    addChannel: () => dispatch(modalActions.openModal({ type: 'add' })),
  };
  // @ts-ignore
  const { channels, currentChannelId } = useSelector((state) => state.channelsReducer);
  return (
    <>
      <ChannelsHeader addChannel={handleActions.addChannel} />
      <Nav variant="pills" fill className="flex-column px-2" as="ul">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isActive={channel.id === currentChannelId}
            handleActions={handleActions}
          />
        ))}
      </Nav>
    </>
  );
};

export default ChannelsBox;
