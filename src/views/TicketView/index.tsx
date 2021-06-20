import { useContext, useEffect } from 'react';
import Logo from '../../components/Logo';
import Filter from '../../components/Filter';
import Tabs from '../../components/Tabs';
import TicketList from '../../components/TicketList';
import ErrorView from '../ErrorView';
import './style.less';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../StoreContext';

export default observer(function TicketView() {
  const ticketStore = useContext(StoreContext);

  useEffect(() => {
    ticketStore.getTickets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (ticketStore.isLoadingError) {
    return <ErrorView statusCode={ticketStore.statusCode as number} />;
  }

  return (
    <section className='ticket-view'>
      <Logo />
      <Filter />
      <Tabs />
      <TicketList tickets={ticketStore.fiveTickets} />
    </section>
  );
});
