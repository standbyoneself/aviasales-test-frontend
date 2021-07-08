import { screen, render } from '@testing-library/react';
import TicketListItem from '@/components/TicketListItem';
import { ticket } from '../../ticket.stub';

describe('TicketListItem', () => {
  it('should have pretty price', () => {
    render(<TicketListItem ticket={ticket} />);

    expect(screen.getByText('26 209 Р')).toBeInTheDocument();
  });

  it('should have correct logo', () => {
    render(<TicketListItem ticket={ticket} />);

    const logo = screen.getByAltText('airlines-logo') as HTMLImageElement;

    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain('TG');
  });

  it('should render <TicketDetails />', () => {
    render(<TicketListItem ticket={ticket} />);

    expect(screen.getByTestId('ticket-details')).toBeInTheDocument();
  });
});
