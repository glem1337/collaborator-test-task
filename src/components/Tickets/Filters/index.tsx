import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

import { FILTER_ITEMS } from '@/constants';
import checkImg from '@/assets/images/check.svg';

import useContainer from './hook';

function Filters() {
  const { handleFilterClick, isActiveFilter, loading } = useContainer();

  return (
    <div className={cn('filters', { 'filters--disabled': loading })}>
      <h3 className="filters__title">
        <FormattedMessage id="filters.title" />
      </h3>

      {FILTER_ITEMS.map((filter) => (
        <div
          className="filters__item"
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
        >
          <div
            className={cn('filters__item-checkbox', {
              'filters__item-checkbox--selected': isActiveFilter(filter.value),
            })}
          >
            <img
              className="filters__item-checkbox-image"
              src={checkImg}
              alt=""
            />
          </div>

          <FormattedMessage {...filter.label} />
        </div>
      ))}
    </div>
  );
}

export default Filters;
