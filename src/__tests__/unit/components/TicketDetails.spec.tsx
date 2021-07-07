import { screen, render } from '@testing-library/react';
import TicketDetails, { TicketDetailsProps } from '@/components/TicketDetails';
import {
  formatTime,
  formatTiming,
  getStopsCountWithDeclination,
  prettyRoutePoints,
} from '@/utils/ticketUtils';

const segments = [
  {
    origin: 'MOW',
    destination: 'HKT',
    date: '2021-07-03T23:14:00.000Z',
    stops: ['SIN', 'DXB'],
    duration: 968,
  },
  {
    origin: 'HKT',
    destination: 'MOW',
    date: '2021-07-24T02:03:00.000Z',
    stops: ['HKG', 'KUL', 'BKK'],
    duration: 1378,
  },
] as TicketDetailsProps['segments'];

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

    expect(screen.getByText(forwardRoutePoints)).toBeInTheDocument();
    expect(screen.getByText(forwardTiming)).toBeInTheDocument();

    expect(screen.getByText(backwardRoutePoints)).toBeInTheDocument();
    expect(screen.getByText(backwardTiming)).toBeInTheDocument();

    expect(screen.getByText(forwardTime)).toBeInTheDocument();
    expect(screen.getByText(backwardTime)).toBeInTheDocument();

    expect(screen.getByText(forwardStopsCount)).toBeInTheDocument();
    expect(screen.getByText(backwardStopsCount)).toBeInTheDocument();

    expect(screen.getByText(forwardStops)).toBeInTheDocument();
    expect(screen.getByText(backwardStops)).toBeInTheDocument();
  });
});
