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
      console.log('ADDING CHANNELS AND ID:');
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    removeChannel(state, { payload }) {
      console.log('REMOVECHANNELS SLICE', state.channels);
      const { id } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = (state.currentChannelId === id) ? 1 : state.currentChannelId;
    },
    renameChannel(state, { payload }) {
      const { channelId, channelName } = payload;
      console.log('Channels', state.channels);
      console.log('payload: ', payload);
      const newChannels = state.channels.map((channel) => {
        if (channel.id === channelId) {
          return { ...channel, name: channelName };
        }
        return channel;
      });
      console.log('NEW CHANNELS', newChannels);
      state.channels = newChannels;
    },
    setActiveChannel(state, { payload }) {
      console.log('SETTING ACTIVE CHANNEL: ', payload.id);
      const { id } = payload;
      state.currentChannelId = id;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
