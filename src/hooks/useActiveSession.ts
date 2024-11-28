import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSession, addSession } from '../store/slices/sessionSlice';
import { TutorAIRootState } from '../store';

export const useActiveSession = () => {
  const dispatch = useDispatch();
  const activeSessionId = useSelector((state: TutorAIRootState) => state.session.currentSessionId);
  const activeSession = useSelector((state: TutorAIRootState) => state.session.activeSessions[activeSessionId || '']);

  const setActiveSession = (sessionId: string) => {
    dispatch(setCurrentSession(sessionId));
  };

  const addNewSession = (session: any) => {
    dispatch(addSession(session));
  };

  return {
    activeSessionId,
    activeSession,
    setActiveSession,
    addNewSession,
  };
};