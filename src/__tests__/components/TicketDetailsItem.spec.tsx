import { screen, render } from '@testing-library/react';
import TicketDetailsItem from '@/components/TicketDetailsItem';

describe('TicketDetailsItem', () => {
  it('should render title correctly', () => {
    render(<TicketDetailsItem title='0 пересадок' text='' />);

    const ticketDetailsItemTitle = screen.getByTestId(
      'ticket-details-item-title'
    );

    expect(ticketDetailsItemTitle).toHaveTextContent('0 пересадок');
  });

  it('should render text correctly', () => {
    render(<TicketDetailsItem title='0 пересадок' text='' />);

    const ticketDetailsItemText = screen.getByTestId(
      'ticket-details-item-text'
    );

    expect(ticketDetailsItemText).toHaveTextContent('');
  });
});
