import { useFetchSessionsQuery } from '../services';

export const useSessionList = () => {
  const { data, isLoading, error, refetch } = useFetchSessionsQuery();

  return {
    sessions: data?.data || [],
    isLoading,
    error,
    refetch,
  };
};