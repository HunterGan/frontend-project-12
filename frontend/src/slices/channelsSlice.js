// @ts-nocheck
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { channels: [], currentChannelId: null };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialState(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChannel(state, { payload }) {
      const { id } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = (state.currentChannelId === id) ? 1 : state.currentChannelId;
    },
    renameChannel(state, { payload }) {
      const { channelId, channelName } = payload;
      const newChannels = state.channels.map((channel) => {
        if (channel.id === channelId) {
          return { ...channel, name: channelName };
        }
        return channel;
      });
      state.channels = newChannels;
    },
    setActiveChannel(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
