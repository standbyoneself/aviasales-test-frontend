import TicketView from './views/TicketView';
import TicketStoreContext from './contexts/TicketStoreContext';
import HTTPClient from './api/HTTPClient';
import TicketService from './services/TicketService';
import TicketStore from './store/TicketStore';

const ticketService = new TicketService(HTTPClient);
const ticketStore = new TicketStore(ticketService);

const styles = {
  backgroundColor: '#f3f7fa',
};

export default function App() {
  return (
    <TicketStoreContext.Provider value={ticketStore}>
      <section className='wrapper' style={styles}>
        <TicketView />
      </section>
    </TicketStoreContext.Provider>
  );
}
