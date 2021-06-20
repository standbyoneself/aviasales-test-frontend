import './style.less';
import FilterCondition from '../FilterCondition';
import { StopFilterRecord } from '../../types';

const stopFilters: StopFilterRecord[] = [
  { Все: 'all' },
  { 'Без пересадок': 0 },
  { '1 пересадка': 1 },
  { '2 пересадки': 2 },
  { '3 пересадки': 3 },
];

export default function Filter() {
  return (
    <div className='filter'>
      <p className='filter__title'>Количество пересадок</p>
      <form className='filter-form'>
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
