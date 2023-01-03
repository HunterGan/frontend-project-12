// @ts-nocheck
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { channels: [], currentChannelId: null };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    addChannels(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    removeChannel(state, { payload }) {
      const { id } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = (state.currentChannelId === id) ? 1 : state.currentChannelId;
    },
    renameChannel(state, { payload }) {
      const { id, name } = payload;
      state.channels = state.channels.map((channel) => {
        if (channel.id === id) {
          channel.name = name;
        }
        return channel;
      });
    },
    setActiveChannel(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
