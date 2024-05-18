import { TTicket } from '@/core/redux/slices/ticketSlice';

import data from './data.json';
import { SortValue } from '@/types/sort';
import { filterFunc, sortFunc } from '@/utils';
import { FiltersValue } from '@/types/filters';

interface IFetchResult {
  tickets: TTicket[];
  hasMore: boolean;
}

export interface ITicketsApiParams {
  offset: number;
  limit: number;
  sort: SortValue;
  filters: FiltersValue[] | [];
}

export const fetchTicketsAPI = async ({
  offset,
  limit,
  sort,
  filters,
}: ITicketsApiParams): Promise<IFetchResult> => {
  console.log('fetchTickets', offset, limit, sort, filters);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Apply filters
      let filteredTickets = data;
      if (filters.length > 0) {
        filteredTickets = filteredTickets.filter((ticket) =>
          filters.some((filter) => filterFunc[filter](ticket)),
        );
      }

      // Apply sorting
      const sortedTickets = filteredTickets.sort(sortFunc[sort]);

      // Apply pagination
      const slicedTickets = sortedTickets.slice(offset, offset + limit);
      const hasMore = offset + limit < filteredTickets.length;

      resolve({
        tickets: slicedTickets,
        hasMore,
      });
    }, 500); // Simulate network delay
  });
};
