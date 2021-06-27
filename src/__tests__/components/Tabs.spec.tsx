import { screen, render, fireEvent } from '@testing-library/react';
import Tabs from '@/components/Tabs';
import TicketStoreContext from '@/contexts/TicketStoreContext';
import HTTPClient from '@/api/HTTPClient';
import TicketService from '@/services/TicketService';
import TicketStore from '@/store/TicketStore';
import { SortRecord } from '@/types';
import { runInAction } from 'mobx';

const ticketService = new TicketService(HTTPClient);
const ticketStore = new TicketStore(ticketService);

const tabRecords: SortRecord[] = [{ 'Самый быстрый': 'fastest' }];

describe('Tabs', () => {
  it('should render tabs', () => {
    render(<Tabs tabRecords={tabRecords} />);

    const tabs = screen.getAllByTestId('tab');

    expect(tabs).toHaveLength(1);
  });

  it("should apply `tab--selected` class if `ticketStore.sortedBy` equals to it's tab value", () => {
    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <Tabs tabRecords={tabRecords} />
      </TicketStoreContext.Provider>
    );

    const tab = screen.getByTestId('tab');

    runInAction(() => {
      ticketStore.sortBy('fastest');
    });

    expect(tab).toHaveClass('tab--selected');
  });

  it('should call `ticketStore.sortBy()` on tab click', () => {
    jest.spyOn(ticketStore, 'sortBy').mockImplementation();

    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <Tabs tabRecords={tabRecords} />
      </TicketStoreContext.Provider>
    );

    const tab = screen.getByTestId('tab');

    fireEvent.click(tab);

    expect(ticketStore.sortBy).toHaveBeenCalledWith('fastest');
  });
});
