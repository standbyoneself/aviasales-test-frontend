import TicketView from './views/TicketView';
import TicketStoreContext from './contexts/TicketStoreContext';
import ticketStore from './store/TicketStore';

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
