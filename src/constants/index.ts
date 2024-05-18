import { FiltersValue } from '@/types/filters';
import { SortValue } from '@/types/sort';

export const FILTER_ITEMS = [
  { label: { id: 'filters.all' }, value: FiltersValue.ALL },
  {
    label: { id: 'shared.withoutLayovers' },
    value: FiltersValue.WITHOUT_LAYOVERS,
  },
  {
    label: { id: 'shared.layover', values: { count: 1 } },
    value: FiltersValue.ONE_LAYOVER,
  },
  {
    label: { id: 'shared.layovers', values: { count: 2 } },
    value: FiltersValue.TWO_LAYOVERS,
  },
  {
    label: { id: 'shared.layovers', values: { count: 3 } },
    value: FiltersValue.THREE_LAYOVERS,
  },
];

export const SORT_ITEMS = [
  { label: { id: 'sort.cheapest' }, value: SortValue.CHEAPEST },
  { label: { id: 'sort.fastest' }, value: SortValue.FASTEST },
  { label: { id: 'sort.optimal' }, value: SortValue.OPTIMAL },
];

export const TICKETS_PER_PAGE = 5;
