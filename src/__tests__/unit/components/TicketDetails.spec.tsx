import { screen, render } from '@testing-library/react';
import TicketDetails from '@/components/TicketDetails';
import {
  formatTime,
  formatTiming,
  getStopsCountWithDeclination,
  prettyRoutePoints,
} from '@/utils/ticketUtils';
import { ticket } from '../../ticket.stub';

const segments = ticket.segments;

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
const backwardTiming = formatTiming(backwardRoute.date, backwardRoute.duration);

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

describe('TicketDetails', () => {
  it('should render all the ticket details correctly', () => {
    render(<TicketDetails segments={segments} />);

    const ticketDetailsItems = screen.getAllByTestId('ticket-details-item');

    expect(ticketDetailsItems[0]).toHaveTextContent(forwardRoutePoints);
    expect(ticketDetailsItems[0]).toHaveTextContent(forwardTiming);

    expect(ticketDetailsItems[1]).toHaveTextContent(backwardRoutePoints);
    expect(ticketDetailsItems[1]).toHaveTextContent(backwardTiming);

    expect(ticketDetailsItems[2]).toHaveTextContent('В пути');
    expect(ticketDetailsItems[2]).toHaveTextContent(forwardTime);

    expect(ticketDetailsItems[3]).toHaveTextContent('В пути');
    expect(ticketDetailsItems[3]).toHaveTextContent(backwardTime);

    expect(ticketDetailsItems[4]).toHaveTextContent(forwardStopsCount);
    expect(ticketDetailsItems[4]).toHaveTextContent(forwardStops);

    expect(ticketDetailsItems[5]).toHaveTextContent(backwardStopsCount);
    expect(ticketDetailsItems[5]).toHaveTextContent(backwardStops);
  });
});
