import TicketListItem from '../TicketListItem';
import { TransitionGroup } from 'react-transition-group';
import Button from '../Button';
import { Ticket } from '../../types';
import './style.less';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import TicketStoreContext from '../../contexts/TicketStoreContext';

interface Props {
  tickets: Ticket[];
}

export default observer(function TicketList({ tickets }: Props) {
  const ticketStore = useContext(TicketStoreContext);

  return (
    <>
      <TransitionGroup className='ticket-list'>
        {tickets.map((ticket, index) => (
          <TicketListItem ticket={ticket} key={index} />
        ))}
      </TransitionGroup>
      <Button
        text='Показать еще 5 билетов!'
        onClick={() => ticketStore.increaseOffsetCoef()}
        style={{ marginTop: 20 }}
      />
    </>
  );
});
