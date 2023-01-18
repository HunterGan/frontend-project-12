// @ts-nocheck
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { isSessionActive: false };

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession(state) {
      state.isSessionActive = true;
    },
    closeSession(state) {
      state.isSessionActive = false;
    },
  },
});

export const { actions } = sessionSlice;
export default sessionSlice.reducer;
