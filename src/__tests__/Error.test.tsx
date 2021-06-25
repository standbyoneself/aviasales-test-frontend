import { screen, render, fireEvent } from '@testing-library/react';
import Error from '../components/Error';
import TicketStoreContext from '../contexts/TicketStoreContext';
import HTTPClient from '../api/HTTPClient';
import TicketService from '../services/TicketService';
import TicketStore from '../store/TicketStore';

const ticketService = new TicketService(HTTPClient);
const ticketStore = new TicketStore(ticketService);

describe('Error', () => {
  it('should render img', () => {
    render(<Error statusCode={404} />);

    expect(screen.getByAltText('dasha-error')).toBeInTheDocument();
  });

  it('should render title', () => {
    render(<Error statusCode={404} />);

    expect(
      screen.getByText('Хьюстон, кажется, у нас проблема...')
    ).toBeInTheDocument();
  });

  it('should render error accordingly with passed status code', () => {
    render(<Error statusCode={404} />);

    expect(screen.getByText('№ 404')).toBeInTheDocument();
  });

  it('should render button', () => {
    render(<Error statusCode={404} />);

    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  describe('Button', () => {
    it('should have text `Попробовать еще раз`', () => {
      render(<Error statusCode={404} />);

      expect(screen.getByTestId('button')).toHaveTextContent(
        'Попробовать еще раз'
      );
    });

    it('should call `ticketStore.getTickets()` on click', () => {
      jest.spyOn(ticketStore, 'getTickets').mockImplementation();

      render(
        <TicketStoreContext.Provider value={ticketStore}>
          <Error statusCode={404} />
        </TicketStoreContext.Provider>
      );

      const button = screen.getByTestId('button');

      fireEvent.click(button);

      expect(ticketStore.getTickets).toHaveBeenCalled();
    });

    it('should have `marginTop: 40`', () => {
      render(<Error statusCode={404} />);

      expect(screen.getByTestId('button')).toHaveStyle({ marginTop: '40px' });
    });
  });
});
