import TicketListItem from '../TicketListItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '../Button';
import NoFilter from '../NoFilter';
import { Ticket } from '../../types';
import './style.less';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import StoreContext from '../../StoreContext';

interface Props {
  tickets: Ticket[];
}

export default observer(function TicketList({ tickets }: Props) {
  const ticketStore = useContext(StoreContext);

  return (
    <div className='ticket-list-container'>
      {ticketStore.isEmptyStopFilterValues ? (
        <NoFilter />
      ) : (
        <>
          <TransitionGroup className='ticket-list'>
            {tickets.map((ticket, index) => (
              <CSSTransition
                in
                appear
                unmountOnExit
                timeout={400}
                classNames='ticket-list-item-fade'
                key={index}
              >
                <TicketListItem ticket={ticket} />
              </CSSTransition>
            ))}
          </TransitionGroup>
          <Button
            text='Показать еще 5 билетов!'
            onClick={() => ticketStore.increaseOffsetCoef()}
            style={{ marginTop: 20 }}
          />
        </>
      )}
    </div>
  );
});
