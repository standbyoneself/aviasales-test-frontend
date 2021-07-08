import { useContext, useEffect } from 'react';
import Logo from '../../components/Logo';
import Filter from '../../components/Filter';
import Tabs from '../../components/Tabs';
import TicketListContainer from '../../components/TicketListContainer';
import './style.less';
import TicketStoreContext from '../../contexts/TicketStoreContext';
import { stopFilters, tabRecords } from '../../constants';

export default function TicketView() {
  const ticketStore = useContext(TicketStoreContext);

  useEffect(() => {
    ticketStore.getTickets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className='ticket-view'>
      <Logo />
      <Filter stopFilters={stopFilters} />
      <Tabs tabRecords={tabRecords} />
      <TicketListContainer />
    </section>
  );
}
