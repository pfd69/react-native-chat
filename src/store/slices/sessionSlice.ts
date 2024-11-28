import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '../../types';

export interface SessionState { // <-- Ensure this is exported
  currentSessionId: string | null;
  activeSessions: Record<string, Session>;
}

export const initialState: SessionState = {
  currentSessionId: null,
  activeSessions: {},
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCurrentSession(state, action: PayloadAction<string>) {
      state.currentSessionId = action.payload;
    },
    addSession(state, action: PayloadAction<Session>) {
      state.activeSessions[action.payload.id] = action.payload;
    },
  },
});

export const { setCurrentSession, addSession } = sessionSlice.actions;
export default sessionSlice.reducer;