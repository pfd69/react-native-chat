import sessionReducer, { SessionState } from './slices/sessionSlice';
import { tutorApi } from '../services';

export interface TutorAIRootState { // Define and export RootState
  session: SessionState;
  [tutorApi.reducerPath]: ReturnType<typeof tutorApi.reducer>;
}

export const tutorReducers = {
  session: sessionReducer,
  [tutorApi.reducerPath]: tutorApi.reducer,
};

export const middlewares = [tutorApi.middleware];

export * from './slices/sessionSlice'; // Export session actions and state
export * from '../services'; // Export API hooks and configuration