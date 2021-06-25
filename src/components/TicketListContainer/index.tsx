import NoFilter from '../NoFilter';
import Error from '../Error';
import './style.less';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import TicketStoreContext from '../../contexts/TicketStoreContext';
import TicketList from '../TicketList';

export default observer(function TicketListContainer() {
  const ticketStore = useContext(TicketStoreContext);

  return (
    <div className='ticket-list-container'>
      {ticketStore.isEmptyStopFilterValues ? (
        <NoFilter />
      ) : ticketStore.isLoadingError ? (
        <Error statusCode={ticketStore.statusCode as number} />
      ) : (
        !ticketStore.isLoading && (
          <TicketList tickets={ticketStore.fiveTickets} />
        )
      )}
    </div>
  );
});
