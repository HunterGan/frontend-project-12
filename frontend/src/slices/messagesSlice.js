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
      console.log('ADDING: ', payload);
      state.messages.push(payload);
    },
    addMessages(state, { payload }) {
      const { messages } = payload;
      state.messages = messages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
