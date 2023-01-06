// @ts-check

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import NewMessagesForm from './NewMessagesForm.jsx';

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

const MessagesBox = () => {
  const { currentChannelId } = useSelector((state) => state.channelsReducer);
  const { messages } = useSelector((state) => state.messagesReducer);
  const curChannelMessages = messages.filter((m) => m.channelId === currentChannelId);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [curChannelMessages]);
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
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessagesForm messages={curChannelMessages} />
      </div>
    </div>
  );
};

export default MessagesBox;
