import { IntlShape } from 'react-intl/src/types';

import { SortValue } from '@/types/sort';
import { TTicket } from '@/core/redux/slices/ticketSlice';
import { FiltersValue } from '@/types/filters';

export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatTravelTime(travelTime: string, intl: IntlShape): string {
  const [hours, minutes] = travelTime.split(':').map(Number);
  const shortHours = intl.formatMessage({ id: 'shared.shortHours' });
  const shortMinutes = intl.formatMessage({ id: 'shared.shortMinutes' });

  return minutes === 0
    ? `${hours}${shortHours}`
    : `${hours}${shortHours} ${minutes}${shortMinutes}`;
}

function getTotalTravelTime(ticket: TTicket) {
  const [forwardHours, forwardMinutes] = ticket.forward.travel_time
    .split(':')
    .map(Number);
  const [backHours, backMinutes] = ticket.back.travel_time
    .split(':')
    .map(Number);

  return forwardHours * 60 + forwardMinutes + backHours * 60 + backMinutes;
}

function sortByPrice(a: TTicket, b: TTicket) {
  return a.price - b.price;
}

export const sortFunc = {
  [SortValue.CHEAPEST]: sortByPrice,

  [SortValue.FASTEST]: (a: TTicket, b: TTicket) => {
    return getTotalTravelTime(a) - getTotalTravelTime(b);
  },

  [SortValue.OPTIMAL]: (a: TTicket, b: TTicket) => {
    const totalTravelTimeA = getTotalTravelTime(a);
    const totalTravelTimeB = getTotalTravelTime(b);

    if (totalTravelTimeA !== totalTravelTimeB) {
      return totalTravelTimeA - totalTravelTimeB;
    }

    const layoversA = a.forward.layovers.length + a.back.layovers.length;
    const layoversB = b.forward.layovers.length + b.back.layovers.length;

    if (layoversA !== layoversB) {
      return layoversA - layoversB;
    }

    return sortByPrice(a, b);
  },
};

export const filterFunc = {
  [FiltersValue.ALL]: () => true,

  [FiltersValue.WITHOUT_LAYOVERS]: (ticket: TTicket) =>
    ticket.forward.layovers.length === 0 && ticket.back.layovers.length === 0,

  [FiltersValue.ONE_LAYOVER]: (ticket: TTicket) =>
    ticket.forward.layovers.length === 1 && ticket.back.layovers.length === 1,

  [FiltersValue.TWO_LAYOVERS]: (ticket: TTicket) =>
    ticket.forward.layovers.length === 2 && ticket.back.layovers.length === 2,

  [FiltersValue.THREE_LAYOVERS]: (ticket: TTicket) =>
    ticket.forward.layovers.length === 3 && ticket.back.layovers.length === 3,
};
