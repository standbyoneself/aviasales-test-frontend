import { screen, render } from '@testing-library/react';
import TicketListItem from '@/components/TicketListItem';
import { Ticket } from '@/types';

const ticket: Ticket = {
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
};

describe('TicketListItem', () => {
  it('should have pretty price', () => {
    render(<TicketListItem ticket={ticket} />);

    expect(screen.getByText('75 171 Р')).toBeInTheDocument();
  });

  it('should have correct logo', () => {
    render(<TicketListItem ticket={ticket} />);

    const logo = screen.getByAltText('airlines-logo') as HTMLImageElement;

    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain('MH');
  });

  it('should render <TicketDetails />', () => {
    render(<TicketListItem ticket={ticket} />);

    expect(screen.getByTestId('ticket-details')).toBeInTheDocument();
  });
});
