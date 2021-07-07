import { screen, render, fireEvent } from '@testing-library/react';
import TicketList from '@/components/TicketList';
import TicketStoreContext from '@/contexts/TicketStoreContext';
import ticketStore from '@/store/TicketStore';
import { ticket } from '../../ticket.stub';

describe('TicketList', () => {
  it('should render correct number of TicketListItem', () => {
    const numberOfTickets = 3;

    ticketStore.tickets = Array(numberOfTickets).fill(ticket);

    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <TicketList tickets={ticketStore.tickets} />
      </TicketStoreContext.Provider>
    );

    const ticketListItems = screen.getAllByTestId('ticket-list-item');

    expect(ticketListItems).toHaveLength(numberOfTickets);
  });

  describe('Button', () => {
    it('should have text `Показать еще 5 билетов!`', () => {
      ticketStore.tickets = Array(11).fill(ticket);

      render(
        <TicketStoreContext.Provider value={ticketStore}>
          <TicketList tickets={ticketStore.tickets} />
        </TicketStoreContext.Provider>
      );

      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('Показать еще 5 билетов!');
    });

    it('should call `ticketStore.increaseOffsetCoef()`', () => {
      ticketStore.tickets = Array(6).fill(ticket);
      jest.spyOn(ticketStore, 'increaseOffsetCoef').mockImplementation();

      render(
        <TicketStoreContext.Provider value={ticketStore}>
          <TicketList tickets={ticketStore.tickets} />
        </TicketStoreContext.Provider>
      );

      const button = screen.getByRole('button');

      fireEvent.click(button);

      expect(ticketStore.increaseOffsetCoef).toHaveBeenCalled();
    });

    it('should have inline style `margin-top: 20px`', () => {
      ticketStore.tickets = Array(6).fill(ticket);

      render(
        <TicketStoreContext.Provider value={ticketStore}>
          <TicketList tickets={ticketStore.tickets} />
        </TicketStoreContext.Provider>
      );

      const button = screen.getByRole('button');

      expect(button).toHaveStyle({ marginTop: '20px' });
    });

    it('should not render if there are no tickets to show in the store', () => {
      ticketStore.tickets = Array(5).fill(ticket);

      render(
        <TicketStoreContext.Provider value={ticketStore}>
          <TicketList tickets={ticketStore.tickets} />
        </TicketStoreContext.Provider>
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
