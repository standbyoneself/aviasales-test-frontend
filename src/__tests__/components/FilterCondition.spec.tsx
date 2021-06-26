import { screen, render, fireEvent } from '@testing-library/react';
import FilterCondition from '@/components/FilterCondition';
import { StopFilterRecord } from '@/types';
import TicketStoreContext from '@/contexts/TicketStoreContext';
import HTTPClient from '@/api/HTTPClient';
import TicketService from '@/services/TicketService';
import TicketStore from '@/store/TicketStore';

const ticketService = new TicketService(HTTPClient);

const stopFilter: StopFilterRecord = {
  Все: 'all',
};

describe('FilterCondition', () => {
  it('should uncheck checkbox when clicked on div', () => {
    render(
      <FilterCondition stopFilter={stopFilter} index='filter-checkbox-1' />
    );

    const filterCondition = screen.getByTestId('filter-condition');
    const checkbox = screen.getByTestId('filter-condition-checkbox'); // Already checked

    fireEvent.click(filterCondition);

    expect(checkbox).not.toBeChecked();
  });

  it('should call `ticketStore.addStopFilterValue()` when checkbox was checked', () => {
    const ticketStore = new TicketStore(ticketService);

    jest.spyOn(ticketStore, 'addStopFilterValue').mockImplementation();

    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <FilterCondition stopFilter={stopFilter} index='filter-checkbox-1' />
      </TicketStoreContext.Provider>
    );

    const checkbox = screen.getByTestId('filter-condition-checkbox'); // Already checked

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(ticketStore.addStopFilterValue).toHaveBeenCalled();
  });

  it('should call `ticketStore.removeStopFilterValue()` when checkbox was unchecked', () => {
    const ticketStore = new TicketStore(ticketService);

    jest.spyOn(ticketStore, 'removeStopFilterValue').mockImplementation();

    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <FilterCondition stopFilter={stopFilter} index='filter-checkbox-1' />
      </TicketStoreContext.Provider>
    );

    const checkbox = screen.getByTestId('filter-condition-checkbox'); // Already checked

    fireEvent.click(checkbox);

    expect(ticketStore.removeStopFilterValue).toHaveBeenCalled();
  });

  it('should render label with correct value', () => {
    render(
      <FilterCondition stopFilter={stopFilter} index='filter-checkbox-1' />
    );

    const label = screen.getByTestId('filter-condition-label');

    expect(label).toHaveTextContent('Все');
  });
});
