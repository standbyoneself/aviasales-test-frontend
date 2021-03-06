import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import TicketStoreContext from '../../contexts/TicketStoreContext';
import { SortName, SortRecord, SortValue } from '../../types';
import Tab from '../Tab';
import './style.less';

interface Props {
  tabRecords: SortRecord[];
}

export default observer(function Tabs({ tabRecords }: Props) {
  const ticketStore = useContext(TicketStoreContext);

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
