import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TICKETS_PER_PAGE } from '@/constants';

import { FiltersValue } from '@/types/filters';
import { SortValue } from '@/types/sort';
import { fetchTicketsAPI } from '@/core/api/api';

import { RootState } from '../store';

export type TTicketWay = {
  to: string;
  from: string;
  departure_time: string;
  arrival_time: string;
  travel_time: string;
  layovers: string[] | [];
};

export type TTicket = {
  id: string;
  price: number;
  forward: TTicketWay;
  back: TTicketWay;
};

export interface ITicketState {
  loading: boolean;
  error: string | null;
  result: TTicket[] | [];
  filters: FiltersValue[] | [];
  sort: SortValue;
  hasMore: boolean;
}

const initialState: ITicketState = {
  loading: false,
  error: null,
  result: [],
  filters: [],
  sort: SortValue.CHEAPEST,
  hasMore: true,
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    resetTickets: (state) => {
      state.loading = false;
      state.error = null;
      state.result = [];
    },
    setTicketsFilters: (
      state,
      action: PayloadAction<ITicketState['filters']>,
    ) => {
      state.filters = action.payload;
    },
    setTicketsSort: (state, action: PayloadAction<ITicketState['sort']>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.result = [...state.result, ...action.payload.tickets];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setTicketsFilters, setTicketsSort, resetTickets } =
  ticketSlice.actions;

// Thunks
export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { result, sort, filters } = state.tickets;

    try {
      return await fetchTicketsAPI({
        offset: result.length,
        sort,
        limit: TICKETS_PER_PAGE,
        filters,
      });
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : 'Unknown error';
      return rejectWithValue(error);
    }
  },
);

// Reducer
export default ticketSlice.reducer;

// Selector
export const ticketSelector = (state: RootState) => state.tickets;
