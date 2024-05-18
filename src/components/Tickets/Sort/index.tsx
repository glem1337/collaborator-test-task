import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

import { SORT_ITEMS } from '@/constants';

import useContainer from './hook';

interface IProps {
  className?: string;
}

function Sort({ className }: IProps) {
  const { handleSortClick, currentSort } = useContainer();

  return (
    <div className={cn('sort', className)}>
      {SORT_ITEMS.map((sort) => (
        <button
          className={cn('sort__button', {
            'sort__button--selected': sort.value === currentSort,
          })}
          key={sort.value}
          onClick={() => handleSortClick(sort.value)}
        >
          <FormattedMessage {...sort.label} />
        </button>
      ))}
    </div>
  );
}

export default Sort;
