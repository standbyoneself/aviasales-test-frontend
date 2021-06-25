import { useContext, useEffect } from 'react';
import Logo from '../../components/Logo';
import Filter from '../../components/Filter';
import Tabs from '../../components/Tabs';
import TicketListContainer from '../../components/TicketListContainer';
import './style.less';
import { observer } from 'mobx-react-lite';
import TicketStoreContext from '../../contexts/TicketStoreContext';

export default observer(function TicketView() {
  const ticketStore = useContext(TicketStoreContext);

  useEffect(() => {
    ticketStore.getTickets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className='ticket-view'>
      <Logo />
      <Filter />
      <Tabs />
      <TicketListContainer />
    </section>
  );
});
