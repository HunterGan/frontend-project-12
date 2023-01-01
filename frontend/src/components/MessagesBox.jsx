// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';

const MessagesBoxHeader = ({ messages, currentChannelId }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b>{`# ${currentChannelId}`}</b>
    </p>
    <span className="text-muted">{`${messages.length} translateMessages`}</span>
  </div>
);

const Message = ({ body, userName }) => (
  <div className="text-break mb-2">
    <b>{userName}</b>
    {`: ${body}`}
  </div>
);
const messes = Array(20).fill(null).map((el, ind) => {
  const message = {
    body: `Message N ${ind}`,
    id: ind + 1,
    userName: 'Harry Potter',
    channelId: 1,
  };
  return message;
});

const MessagesBox = () => {
  console.log('messagesBox', messes);
  const { currentChannelId } = useSelector((state) => state.channelsReducer);
  /// const { messages } = useSelector((state) => state.messagesReducer);
  const curChannelMessages = messes;
  /// = messages.filter((message) => message.channelId !== currentChannelId);
  return (
    <div className="d-flex flex-column h-100">
      <MessagesBoxHeader messages={curChannelMessages} currentChannelId={currentChannelId} />
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {curChannelMessages.map((message) => (
          <Message
            key={message.id}
            body={message.body}
            userName={message.userName}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesBox;
