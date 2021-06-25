import './style.less';
import FilterCondition from '../FilterCondition';
import { StopFilterRecord } from '../../types';

interface Props {
  stopFilters: StopFilterRecord[];
}

export default function Filter({ stopFilters }: Props) {
  return (
    <div className='filter'>
      <p className='filter__title'>Количество пересадок</p>
      <form className='filter-form' data-testid='filter-form'>
        {stopFilters.map((stopFilter, index) => {
          return (
            <FilterCondition
              stopFilter={stopFilter}
              key={index}
              index={`filter-checkbox-${index}`}
            />
          );
        })}
      </form>
    </div>
  );
}
