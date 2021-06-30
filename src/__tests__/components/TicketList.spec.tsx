import { screen, render, fireEvent } from '@testing-library/react';
import TicketList from '@/components/TicketList';
import { Ticket } from '@/types';
import TicketStoreContext from '@/contexts/TicketStoreContext';
import HTTPClient from '@/api/HTTPClient';
import TicketService from '@/services/TicketService';
import TicketStore from '@/store/TicketStore';

const ticketService = new TicketService(HTTPClient);
const ticketStore = new TicketStore(ticketService);

const tickets: Ticket[] = [
  {
    price: 75171,
    carrier: 'MH',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2021-07-04T13:54:00.000Z',
        stops: [],
        duration: 1868,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2021-07-23T23:06:00.000Z',
        stops: [],
        duration: 1584,
      },
    ],
  },
  {
    price: 52622,
    carrier: 'S7',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2021-07-04T13:53:00.000Z',
        stops: [],
        duration: 910,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2021-07-24T09:07:00.000Z',
        stops: [],
        duration: 1487,
      },
    ],
  },
  {
    price: 54291,
    carrier: 'SU',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2021-07-04T12:27:00.000Z',
        stops: ['AUH', 'SIN'],
        duration: 781,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2021-07-24T03:01:00.000Z',
        stops: [],
        duration: 959,
      },
    ],
  },
];

describe('TicketList', () => {
  it('should render correct number of TicketListItem', () => {
    render(<TicketList tickets={tickets} />);

    const ticketListItems = screen.getAllByTestId('ticket-list-item');

    expect(ticketListItems).toHaveLength(3);
  });

  describe('Button', () => {
    it('should have text `Показать еще 5 билетов!`', () => {
      render(<TicketList tickets={tickets} />);

      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('Показать еще 5 билетов!');
    });

    it('should call `ticketStore.increaseOffsetCoef()`', () => {
      jest.spyOn(ticketStore, 'increaseOffsetCoef');

      render(
        <TicketStoreContext.Provider value={ticketStore}>
          <TicketList tickets={tickets} />
        </TicketStoreContext.Provider>
      );

      const button = screen.getByRole('button');

      fireEvent.click(button);

      expect(ticketStore.increaseOffsetCoef).toHaveBeenCalled();
    });

    it('should have inline style `margin-top: 20px`', () => {
      render(<TicketList tickets={tickets} />);

      const button = screen.getByRole('button');

      expect(button).toHaveStyle({ marginTop: '20px' });
    });
  });
});
