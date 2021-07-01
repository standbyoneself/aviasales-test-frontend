import { observer } from 'mobx-react-lite';
import { ChangeEvent, useContext, useRef } from 'react';
import TicketStoreContext from '../../contexts/TicketStoreContext';
import { StopFilterName, StopFilterRecord, StopFilterValue } from '../../types';
import './style.less';

interface Props {
  stopFilter: StopFilterRecord;
  index: string;
}

export default observer(function FilterCondition({ stopFilter, index }: Props) {
  const ticketStore = useContext(TicketStoreContext);

  const [[stopFilterName, stopFilterValue]] = Object.entries(stopFilter) as [
    [StopFilterName, StopFilterValue]
  ];

  const checkbox = useRef<HTMLInputElement>(null);

  const toggleCondition = (event: ChangeEvent) => {
    const checkboxEl = event.target as HTMLInputElement;

    if (!checkboxEl) {
      return;
    }

    if (checkboxEl.checked) {
      ticketStore.addStopFilterValue(stopFilterValue);
    } else {
      ticketStore.removeStopFilterValue(stopFilterValue);
    }
  };

  const toggleCheckbox = () => {
    const checkboxEl = checkbox.current;

    if (!checkboxEl) {
      return;
    }

    checkboxEl.click();
  };

  return (
    <div
      className='filter-condition'
      onClick={toggleCheckbox}
      data-testid='filter-condition'
    >
      <input
        className='filter-condition__checkbox'
        type='checkbox'
        id={index}
        ref={checkbox}
        checked={ticketStore.stopFilterValues.includes(stopFilterValue)}
        onChange={toggleCondition}
        onClick={(event) => event.stopPropagation()}
        data-testid='filter-condition-checkbox'
      />
      <label
        className='filter-condition__label'
        htmlFor={index}
        onClick={(event) => event.stopPropagation()}
        data-testid='filter-condition-label'
      >
        {stopFilterName}
      </label>
    </div>
  );
});
