// @ts-nocheck
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { messages: [] };

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
    addMessages(state, { payload }) {
      const { messages } = payload;
      state.messages = messages;
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
