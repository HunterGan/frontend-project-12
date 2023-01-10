// @ts-nocheck
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { type: null, channelId: null, active: false };

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      const { type, id } = payload;
      state.type = type;
      state.id = id;
      state.active = true;
    },
    closeModal(state) {
      state.type = null;
      state.id = null;
      state.active = false;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
