import { getTime } from './dateFormat';

import { Ticket } from '../types';

/**
 * Returns the string representation
 * of the `price` argument
 * with the locale
 * and contains the `Р` at the end
 * @param {number} price
 * @returns {string} String formatted as `'15 428 Р'`
 *
 * @example
 * prettyPrice(15428) => '15 428 Р'
 */
// .replace() is needed because of different behavior in other environments
export const prettyPrice = (price: number): string => {
  return `${price.toLocaleString('ru-RU')} Р`.replace(/,/g, ' ');
};

/**
 * Returns the string
 * contains the `origin` and `destination` arguments
 * separated by ` - `
 * @param {string} origin
 * @param {string} destination
 * @returns {string} String formatted as `'Some origin - Some destination'`
 *
 * @example
 * prettyRoutePoints('MOW', 'HKT') => 'MOW - HKT'
 */
export const prettyRoutePoints = (
  origin: string,
  destination: string
): string => {
  return `${origin} - ${destination}`;
};

/**
 * Returns the string
 * contains the timing of the flight
 * @param {string} departureStringifiedDate
 * @param {number} duration - Minutes of the flight
 * @returns {string} String formatted as `'hh:mm - hh:mm'`
 *
 * @example formatTiming('2021-06-26T13:02:00.000Z', 1281) => '13:02 - 10:23'
 */
export const formatTiming = (
  departureStringifiedDate: string,
  duration: number
): string => {
  const departureDate = new Date(departureStringifiedDate);
  const departureTime = getTime(departureDate);

  const arrivalDate = new Date(
    departureDate.setMinutes(departureDate.getMinutes() + duration)
  );
  const arrivalTime = getTime(arrivalDate);

  return `${departureTime} - ${arrivalTime}`;
};

/**
 * Returns the string representation
 * of the flight duration
 * contains hours and minutes
 * @param {number} duration - Minutes of the flight
 * @returns {string} String formatted as `'hч mм'`
 *
 * @example formatTime(70) => '1ч 10м'
 */
export const formatTime = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}ч ${minutes}м`;
};

/**
 * @author Alexander Scherbinin <https://github.com/realmyst>
 *
 * Returns the declination
 * of `declinations` argument
 * accordingly with `n` argument
 * @param {number} n - The amount of something
 * @param {string[]} declinations
 * @returns {string} The declination
 *
 * @example
 * const declinations = ['пересадка', 'пересадки', 'пересадок'];
 * getDeclination(0, words) => '0 пересадок'
 */
const getDeclination = (n: number, declinations: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return declinations[
    n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]
  ];
};

/**
 * Returns the string
 * contains the number of stops
 * and the right declination
 * @param {number} n - The amount of stops
 * @returns {string} The string formatted as `n пересадка(-ки, -ок)`
 *
 * @example
 * getStopsCountWithDeclination(0) => 'Прямой'
 *
 * @example
 * getStopsCountWithDeclination(1) => '1 пересадка'
 *
 * @example
 * getStopsCountWithDeclination(2) => '2 пересадки'
 */
export const getStopsCountWithDeclination = (n: number): string => {
  const declinations = ['пересадка', 'пересадки', 'пересадок'];
  const declination = getDeclination(n, declinations);
  return n === 0 ? 'Прямой' : `${n} ${declination}`;
};

export const getDuration = (ticket: Ticket) =>
  ticket.segments.reduce((acc, segment) => (acc += segment.duration), 0);

export const getStopsCount = (ticket: Ticket) =>
  ticket.segments.reduce((acc, segment) => (acc += segment.stops.length), 0);

export const sortByPrice = (tickets: Ticket[]) => {
  return [...tickets].sort((a, b) => a.price - b.price);
};

export const sortBySpeed = (tickets: Ticket[]) => {
  return [...tickets].sort((a, b) => {
    const prevTicketDuration = getDuration(a);
    const nextTicketDuration = getDuration(b);

    return prevTicketDuration - nextTicketDuration;
  });
};

export const sortByStopsCountAndPrice = (tickets: Ticket[]) => {
  return [...tickets].sort((a, b) => {
    const prevTicketStopsCount = getStopsCount(a);
    const nextTicketStopsCount = getStopsCount(b);

    const prevTicketPrice = a.price;
    const nextTicketPrice = b.price;

    return (
      prevTicketStopsCount - nextTicketStopsCount ||
      prevTicketPrice - nextTicketPrice
    );
  });
};
