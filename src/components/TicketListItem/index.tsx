import AirlinesLogo from '../AirlinesLogo';
import TicketDetails from '../TicketDetails';
import { CSSTransition } from 'react-transition-group';
import { prettyPrice } from '../../utils/ticketUtils';
import { Ticket } from '../../types';
import './style.less';

interface Props {
  ticket: Ticket;
}

export default function TicketListItem({ ticket }: Props) {
  const { price, carrier } = ticket;

  return (
    <CSSTransition timeout={40000} classNames='ticket-list-item-fade' in appear>
      <div className='ticket-list-item'>
        <div className='ticket-list-item__header'>
          <p className='ticket-price'>{prettyPrice(price)}</p>
          <AirlinesLogo IATA={carrier} />
        </div>
        <div className='ticket-list-item__body'>
          <TicketDetails segments={ticket.segments} />
        </div>
      </div>
    </CSSTransition>
  );
}
