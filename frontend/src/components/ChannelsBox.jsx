// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions } from '../slices/channelsSlice.js';
/// import { useActions } from '../hooks/index.js';

const ChannelsHeader = () => (
  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
    <span>??Channels</span>
    <button type="button" className="p-0 text-primary btn btn-group-vertical">
      <PlusSquare size={20} />
      <span className="visually-hidden">+</span>
    </button>
  </div>
);

// eslint-disable-next-line object-curly-newline
const Channel = ({ channel, setActiveChannel, isActive }) => {
  console.log('setActiveChannel', setActiveChannel);
  return (
    <Nav.Item as="li" className="w-100">
      <Nav.Link
        onClick={setActiveChannel}
        as="button"
        bsPrefix="btn"
        type="button"
        className={`w-100 rounded-0 text-start ${isActive && 'btn-secondary'}`}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Nav.Link>
    </Nav.Item>
  );
};

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const setActiveChannel = (id) => () => dispatch(actions.setActiveChannel({ id }));
  // @ts-ignore
  const { channels, currentChannelId } = useSelector((state) => state.channelsReducer);
  return (
    <>
      <ChannelsHeader />
      <Nav variant="pills" fill className="flex-column px-2" as="ul">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isActive={channel.id === currentChannelId}
            setActiveChannel={setActiveChannel(channel.id)}
          />
        ))}
      </Nav>
    </>
  );
};

export default ChannelsBox;
