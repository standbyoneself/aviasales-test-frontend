import {
  formatTime,
  formatTiming,
  getStopsCountWithDeclination,
  prettyRoutePoints,
} from '../../utils/ticketUtils';
import TicketDetailsItem from '../TicketDetailsItem';
import { Ticket } from '../../types';

import './style.less';

export type TicketDetailsProps = Pick<Ticket, 'segments'>;

export default function TicketDetails({ segments }: TicketDetailsProps) {
  const [forwardRoute, backwardRoute] = segments;

  const forwardRoutePoints = prettyRoutePoints(
    forwardRoute.origin,
    forwardRoute.destination
  );
  const backwardRoutePoints = prettyRoutePoints(
    backwardRoute.origin,
    backwardRoute.destination
  );

  const forwardTiming = formatTiming(forwardRoute.date, forwardRoute.duration);
  const backwardTiming = formatTiming(
    backwardRoute.date,
    backwardRoute.duration
  );

  const forwardTime = formatTime(forwardRoute.duration);
  const backwardTime = formatTime(backwardRoute.duration);

  const forwardStopsCount = getStopsCountWithDeclination(
    forwardRoute.stops.length
  );
  const backwardStopsCount = getStopsCountWithDeclination(
    backwardRoute.stops.length
  );

  const forwardStops = forwardRoute.stops.join(', ');
  const backwardStops = backwardRoute.stops.join(', ');

  return (
    <div className='ticket-details' data-testid='ticket-details'>
      <div className='ticket-details-item-container'>
        <TicketDetailsItem title={forwardRoutePoints} text={forwardTiming} />
        <TicketDetailsItem title={backwardRoutePoints} text={backwardTiming} />
      </div>
      <div className='ticket-details-item-container'>
        <TicketDetailsItem title='В пути' text={forwardTime} />
        <TicketDetailsItem title='В пути' text={backwardTime} />
      </div>
      <div className='ticket-details-item-container'>
        <TicketDetailsItem title={forwardStopsCount} text={forwardStops} />
        <TicketDetailsItem title={backwardStopsCount} text={backwardStops} />
      </div>
    </div>
  );
}
