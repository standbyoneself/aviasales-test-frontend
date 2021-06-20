import AirlinesLogo from '../AirlinesLogo';
import TicketDetails from '../TicketDetails';
import { prettyPrice } from '../../utils/ticketUtils';
import { Ticket } from '../../types';
import './style.less';

interface Props {
  ticket: Ticket;
}

export default function TicketListItem({ ticket }: Props) {
  const { price, carrier } = ticket;

  return (
    <div className='ticket-list-item'>
      <div className='ticket-list-item__header'>
        <p className='ticket-price'>{prettyPrice(price)}</p>
        <AirlinesLogo IATA={carrier} />
      </div>
      <div className='ticket-list-item__body'>
        <TicketDetails segments={ticket.segments} />
      </div>
    </div>
  );
}
