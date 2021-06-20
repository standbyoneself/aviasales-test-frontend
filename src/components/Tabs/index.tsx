import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import StoreContext from '../../StoreContext';
import { SortName, SortRecord, SortValue } from '../../types';
import Tab from '../Tab';
import './style.less';

const tabRecords: SortRecord[] = [
  { 'Самый дешевый': 'cheapest' },
  { 'Самый быстрый': 'fastest' },
  { Оптимальный: 'optimal' },
];

export default observer(function Tabs() {
  const ticketStore = useContext(StoreContext);

  return (
    <div className='tabs'>
      {tabRecords.map((tabRecord) => {
        const [[tabRecordName, tabRecordValue]] = Object.entries(tabRecord) as [
          [SortName, SortValue]
        ];

        return (
          <Tab
            title={tabRecordName}
            key={tabRecordName}
            className={
              ticketStore.sortedBy === tabRecordValue ? 'tab--selected' : ''
            }
            onClick={() => ticketStore.sortBy(tabRecordValue)}
          />
        );
      })}
    </div>
  );
});
