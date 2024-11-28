// src/mocks/store.ts
import { Session, Message } from '../types';
import { generateMockSessions } from '.';

export const mockStore: {
  sessions: Session[];
  messages: Record<string, Message[]>; // Explicit type for messages
} = {
  sessions: generateMockSessions(), // Pre-generate sessions
//   sessions: [], // Initially, sessions can be generated using generateMockSessions()
  messages: {}, // Initially, no messages are stored for any session
};