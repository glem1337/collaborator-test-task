import { FormattedMessage, FormattedPlural, useIntl } from 'react-intl';
import cn from 'classnames';

import { TTicket } from '@/core/redux/slices/ticketSlice';
import { formatPrice, formatTravelTime } from '@/utils';

import ticketLogo from '@/assets/images/ticket-logo.svg';

interface IProps {
  ticket: TTicket;
  className?: string;
}

function Ticket({ ticket, className }: IProps) {
  const intl = useIntl();

  return (
    <div className={cn('ticket', className)}>
      <div className="ticket__header">
        <div className="ticket__price">{formatPrice(ticket.price)} $</div>

        <img className="ticket__logo" src={ticketLogo} alt="" />
      </div>

      <div className="ticket__row">
        <div className="ticket__cell">
          <div className="ticket__cell-title">
            {ticket.forward.from} - {ticket.forward.to}
          </div>

          <div className="ticket__cell-value">
            {ticket.forward.departure_time} - {ticket.forward.arrival_time}
          </div>
        </div>

        <div className="ticket__cell">
          <div className="ticket__cell-title">
            <FormattedMessage id="shared.travelTime" />
          </div>

          <div className="ticket__cell-value">
            {formatTravelTime(ticket.forward.travel_time, intl)}
          </div>
        </div>

        <div className="ticket__cell">
          <div className="ticket__cell-title">
            {!ticket.forward.layovers.length && (
              <FormattedMessage id="shared.withoutLayovers" />
            )}

            {Boolean(ticket.forward.layovers.length) && (
              <FormattedPlural
                value={ticket.forward.layovers.length}
                one={
                  <FormattedMessage
                    id="shared.layover"
                    values={{ count: ticket.forward.layovers.length }}
                  />
                }
                other={
                  <FormattedMessage
                    id="shared.layovers"
                    values={{ count: ticket.forward.layovers.length }}
                  />
                }
              />
            )}
          </div>

          <div className="ticket__cell-value">
            {ticket.forward.layovers.join(', ')}
          </div>
        </div>
      </div>

      <div className="ticket__row">
        <div className="ticket__cell">
          <div className="ticket__cell-title">
            {ticket.back.from} - {ticket.back.to}
          </div>

          <div className="ticket__cell-value">
            {ticket.back.departure_time} - {ticket.back.arrival_time}
          </div>
        </div>

        <div className="ticket__cell">
          <div className="ticket__cell-title">
            <FormattedMessage id="shared.travelTime" />
          </div>

          <div className="ticket__cell-value">
            {formatTravelTime(ticket.back.travel_time, intl)}
          </div>
        </div>

        <div className="ticket__cell">
          <div className="ticket__cell-title">
            {!ticket.back.layovers.length && (
              <FormattedMessage id="shared.withoutLayovers" />
            )}

            {Boolean(ticket.back.layovers.length) && (
              <FormattedPlural
                value={ticket.back.layovers.length}
                one={
                  <FormattedMessage
                    id="shared.layover"
                    values={{ count: ticket.back.layovers.length }}
                  />
                }
                other={
                  <FormattedMessage
                    id="shared.layovers"
                    values={{ count: ticket.back.layovers.length }}
                  />
                }
              />
            )}
          </div>

          <div className="ticket__cell-value">
            {ticket.back.layovers.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
