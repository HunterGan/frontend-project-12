// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dropdown, Nav, Button, ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions } from '../slices/channelsSlice.js';
/// import { useActions } from '../hooks/index.js';

const ChannelsHeader = ({ addChannel }) => (
  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
    <span>??Channels</span>
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

// eslint-disable-next-line object-curly-newline
const Channel = ({ channel, isActive, handleActions }) => {
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
            <span className="visually-hidden">translateManageChannel</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleActions.removeChannel}>translateDelete</Dropdown.Item>
            <Dropdown.Item onClick={handleActions.renameChannel}>translateRename</Dropdown.Item>
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
    setActiveChannel: (id) => () => dispatch(actions.setActiveChannel({ id })),
    removeChannel: () => console.log('open modal Remove channel'),
    renameChannel: () => console.log('open modal Rename channel'),
    addChannel: () => console.log('open modal add channel'),
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
