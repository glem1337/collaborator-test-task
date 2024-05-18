import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import {
  fetchTickets,
  resetTickets,
  setTicketsSort,
  ticketSelector,
} from '@/core/redux/slices/ticketSlice';
import { SortValue } from '@/types/sort';

interface UseContainerReturn {
  handleSortClick: (value: SortValue) => void;
  currentSort: SortValue;
}

function useContainer(): UseContainerReturn {
  const dispatch = useAppDispatch();
  const { sort, loading } = useAppSelector(ticketSelector);

  function handleSortClick(value: SortValue): void {
    if (value === sort || loading) {
      return;
    }

    dispatch(resetTickets());
    dispatch(setTicketsSort(value));
    dispatch(fetchTickets());
  }

  return { handleSortClick, currentSort: sort };
}

export default useContainer;
