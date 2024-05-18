import { FormattedMessage } from 'react-intl';

import { TICKETS_PER_PAGE } from '@/constants';

import Error from '@/components/Error';
import Ticket from './Ticket';
import Filters from './Filters';
import Sort from './Sort';

import useContainer from './hook';

function Tickets() {
  const { result, loading, error, hasMore, fetchData } = useContainer();

  return (
    <div className="tickets">
      <div className="tickets__filters">
        <Filters />
      </div>

      <div className="tickets__content">
        <Sort className="tickets__sort" />

        {error && <Error message={error} />}

        {!result.length && loading && !error && (
          <div className="tickets__preloading">
            <FormattedMessage id="shared.loading" />
          </div>
        )}

        {!result.length && !loading && !error && (
          <div className="tickets__preloading">
            <FormattedMessage id="shared.noResults" />
          </div>
        )}

        {Boolean(result.length) &&
          result.map((ticket) => (
            <Ticket className="tickets__item" key={ticket.id} ticket={ticket} />
          ))}

        {Boolean(result.length) && hasMore && (
          <button className="tickets__load-more-btn" onClick={fetchData}>
            <FormattedMessage
              id={loading ? 'shared.loading' : 'shared.loadMoreTickets'}
              values={{ count: TICKETS_PER_PAGE }}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Tickets;
