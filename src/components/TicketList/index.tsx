import TicketListItem from '../TicketListItem';
import { TransitionGroup } from 'react-transition-group';
import Button from '../Button';
import { Ticket } from '../../types';
import './style.less';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import TicketStoreContext from '../../contexts/TicketStoreContext';
import { getRestTicketsToShowWithDeclination } from '../../utils/ticketUtils';

interface Props {
  tickets: Ticket[];
}

export default observer(function TicketList({ tickets }: Props) {
  const ticketStore = useContext(TicketStoreContext);

  const { restTicketsToShow } = ticketStore;
  console.log('rest', restTicketsToShow);
  const btnText =
    restTicketsToShow >= 5
      ? 'Показать еще 5 билетов!'
      : `Показать еще ${getRestTicketsToShowWithDeclination(
          restTicketsToShow
        )}!`;

  return (
    <>
      <TransitionGroup className='ticket-list' data-testid='ticket-list'>
        {tickets.map((ticket, index) => (
          <TicketListItem ticket={ticket} key={index} />
        ))}
      </TransitionGroup>
      {restTicketsToShow > 0 ? (
        <Button
          text={btnText}
          onClick={() => ticketStore.increaseOffsetCoef()}
          style={{ marginTop: 20 }}
        />
      ) : null}
    </>
  );
});
