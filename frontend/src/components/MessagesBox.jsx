// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import NewMessagesForm from './NewMessagesForm.jsx';

const MessagesBoxHeader = ({ messages, currentChannel }) => {
  const { t } = useTranslation();
  return messages && (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannel?.name ?? ''}`}</b>
      </p>
      <span className="text-muted">{`${messages.length} ${t('messages.count', { count: messages.length })}`}</span>
    </div>
  );
};

const Message = ({ body, userName }) => {
  const filtered = leoProfanity.clean(body);
  return (
    <div className="text-break mb-2">
      <b>{userName}</b>
      {`: ${filtered}`}
    </div>
  );
};
const MessagesBox = () => {
  // @ts-ignore
  const { channels, currentChannelId } = useSelector((state) => state.channelsReducer);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  // @ts-ignore
  const { messages } = useSelector((state) => state.messagesReducer);
  const curChannelMessages = messages.filter((m) => m.channelId === currentChannelId);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [curChannelMessages]);
  return (
    <div className="d-flex flex-column h-100">
      <MessagesBoxHeader messages={curChannelMessages} currentChannel={currentChannel} />
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
