import { screen, render } from '@testing-library/react';
import TicketListContainer from '@/components/TicketListContainer';
import TicketStoreContext from '@/contexts/TicketStoreContext';
import ticketStore from '@/store/TicketStore';

describe('TicketListContainer', () => {
  it('should render <NoFilter /> if no filters selected in `TicketStore`', () => {
    ticketStore.stopFilterValues = [];

    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <TicketListContainer />
      </TicketStoreContext.Provider>
    );

    expect(screen.getByTestId('no-filter')).toBeInTheDocument();
  });

  it('should render <Error /> if there was error loading tickets', () => {
    ticketStore.stopFilterValues = ['all'];
    ticketStore.statusCode = 500;

    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <TicketListContainer />
      </TicketStoreContext.Provider>
    );

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('should render <TicketList /> otherwise', () => {
    ticketStore.statusCode = null;

    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <TicketListContainer />
      </TicketStoreContext.Provider>
    );

    expect(screen.getByTestId('ticket-list')).toBeInTheDocument();
  });
});
