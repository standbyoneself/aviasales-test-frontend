import { screen, render } from '@testing-library/react';
import TicketDetailsItem from '@/components/TicketDetailsItem';

describe('TicketDetailsItem', () => {
  it('should render title correctly', () => {
    render(<TicketDetailsItem title='1 пересадка' text='' />);

    const ticketDetailsItemTitle = screen.getByTestId(
      'ticket-details-item-title'
    );

    expect(ticketDetailsItemTitle).toHaveTextContent('1 пересадка');
  });

  it('should render text correctly', () => {
    render(<TicketDetailsItem title='1 пересадка' text='MOW, HKT' />);

    const ticketDetailsItemText = screen.getByTestId(
      'ticket-details-item-text'
    );

    expect(ticketDetailsItemText).toHaveTextContent('MOW, HKT');
  });
});
