import { screen, render } from '@testing-library/react';
import Logo from '@/components/Logo';
import TicketStoreContext from '@/contexts/TicketStoreContext';
import ticketStore from '@/store/TicketStore';
import { runInAction } from 'mobx';

describe('Logo', () => {
  it('should apply `animate` class to plane container div when `ticketStore.isLoading === true`', () => {
    render(
      <TicketStoreContext.Provider value={ticketStore}>
        <Logo />
      </TicketStoreContext.Provider>
    );

    const planeContainer = screen.getByTestId('plane-container');

    runInAction(() => {
      ticketStore.isLoading = true;
    });

    expect(planeContainer).toHaveClass('animate');

    runInAction(() => {
      ticketStore.isLoading = false;
    });

    expect(planeContainer).not.toHaveClass('animate');
  });
});
