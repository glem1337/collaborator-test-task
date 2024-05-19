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

// In this implementation, I handle sorting and filtering on the backend because
// doing so on the frontend is impractical. Filtering on the frontend would only
// apply to the current state data, and the list would change upon loading new
// data. Additionally, in real-world projects, backend APIs usually manage
// filtering, sorting, and pagination (e.g., JSON API). However, for this test
// task, I decided to simulate this behavior.
export const fetchTicketsAPI = async ({
  offset,
  limit,
  sort,
  filters,
}: ITicketsApiParams): Promise<IFetchResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Apply filters
      let filteredTickets = data;
      // We can return no data if there are no filters, but I would prefer to return all data.
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
