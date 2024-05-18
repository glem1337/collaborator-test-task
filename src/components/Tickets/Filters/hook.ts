import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import {
  fetchTickets,
  resetTickets,
  setTicketsFilters,
  ticketSelector,
} from '@/core/redux/slices/ticketSlice';
import { FiltersValue } from '@/types/filters';

interface UseContainerReturn {
  handleFilterClick: (value: FiltersValue) => void;
  isActiveFilter: (value: FiltersValue) => boolean;
  loading: boolean
}

function useContainer(): UseContainerReturn {
  const dispatch = useAppDispatch();
  const { filters, loading } = useAppSelector(ticketSelector);

  function isActiveFilter(value: FiltersValue): boolean {
    return filters.some((item) => item === value);
  }

  function handleFilterClick(value: FiltersValue): void {
    if (loading) {
      return;
    }

    dispatch(resetTickets());

    if (isActiveFilter(value)) {
      const nextFilters = filters.filter((item) => item !== value);
      dispatch(setTicketsFilters(nextFilters));
    } else {
      dispatch(setTicketsFilters([...filters, value]));
    }

    dispatch(fetchTickets());
  }

  return { handleFilterClick, isActiveFilter, loading };
}

export default useContainer;
