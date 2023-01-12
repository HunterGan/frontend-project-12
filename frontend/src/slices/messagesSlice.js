// @ts-nocheck
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const initialState = { messages: [] };

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    })
      .addCase(channelsActions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
