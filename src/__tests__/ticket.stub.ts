import { Ticket } from '@/types';

export const ticket: Ticket = {
  price: 26209,
  carrier: 'TG',
  segments: [
    {
      origin: 'MOW',
      destination: 'HKT',
      date: '2021-07-16T16:12:00.000Z',
      stops: ['BKK'],
      duration: 886,
    },
    {
      origin: 'HKT',
      destination: 'MOW',
      date: '2021-08-05T00:59:00.000Z',
      stops: ['AUH'],
      duration: 1677,
    },
  ],
};
