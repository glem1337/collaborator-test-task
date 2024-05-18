import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { ticketSelector, fetchTickets } from '@/core/redux/slices/ticketSlice';

function useContainer() {
  const dispatch = useAppDispatch();
  const { result, loading, error, hasMore } = useAppSelector(ticketSelector);

  function fetchData() {
    if (!loading && hasMore) {
      dispatch(fetchTickets());
    }
  }

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, []);

  return {
    result,
    loading,
    error,
    hasMore,

    fetchData,
  };
}

export default useContainer;
