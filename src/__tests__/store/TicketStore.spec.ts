import { TicketStore } from '@/store/TicketStore';
import TicketService from '@/services/TicketService';
import HTTPClient from '@/api/HTTPClient';
import { SearchIdResponse, Ticket, TicketResponse } from '@/types';

const stubbedTicket: Ticket = {
  price: 98725,
  carrier: 'EK',
  segments: [
    {
      origin: 'MOW',
      destination: 'HKT',
      date: '2021-07-12T04:18:00.000Z',
      stops: ['IST', 'HKG'],
      duration: 842,
    },
    {
      origin: 'HKT',
      destination: 'MOW',
      date: '2021-08-01T01:33:00.000Z',
      stops: ['SIN', 'AUH'],
      duration: 662,
    },
  ],
};

const stubbedAnotherTicket = {
  ...stubbedTicket,
  price: stubbedTicket.price + 100,
};

describe('TicketStore', () => {
  let ticketStore: TicketStore;
  beforeEach(() => {
    ticketStore = new TicketStore(new TicketService(HTTPClient));
  });
  it('should increase the offset coefficient', () => {
    ticketStore.increaseOffsetCoef();

    expect(ticketStore.offsetCoef).toBe(2);
  });

  it('should add a stop filter', () => {
    ticketStore.stopFilterValues = [];

    ticketStore.addStopFilterValue(1);

    expect(ticketStore.stopFilterValues).toContain(1);
  });

  it('should add all stop filters if the `all` stop filter is also added', () => {
    ticketStore.stopFilterValues = [];

    ticketStore.addStopFilterValue('all');

    expect(ticketStore.stopFilterValues).toContain('all');
    expect(ticketStore.stopFilterValues).toContain(0);
    expect(ticketStore.stopFilterValues).toContain(1);
    expect(ticketStore.stopFilterValues).toContain(2);
    expect(ticketStore.stopFilterValues).toContain(3);
  });

  it(`should add the 'all' stop filter if there are already
    all stop filters exclusive of the actual added stop filter`, () => {
    ticketStore.stopFilterValues = [0, 1, 2];

    ticketStore.addStopFilterValue(3);

    expect(ticketStore.stopFilterValues).toContain('all');
  });

  it('should remove a stop filter', () => {
    ticketStore.removeStopFilterValue(0);

    expect(ticketStore.stopFilterValues).not.toContain(0);
  });

  it(`should remove all the stop filters
  if the 'all' stop filter is removed`, () => {
    ticketStore.removeStopFilterValue('all');

    expect(ticketStore.stopFilterValues).toEqual([]);
  });

  it(`should remove the 'all' stop filter
  if a some other stop filter was removed`, () => {
    ticketStore.removeStopFilterValue(0);

    expect(ticketStore.stopFilterValues).not.toContain('all');
  });

  it('should set `sortedBy`', () => {
    ticketStore.sortBy('optimal');

    expect(ticketStore.sortedBy).toBe('optimal');
  });

  it('should get the `searchId`', async () => {
    const stubbedSearchId = 'jafde8r9wq1';
    const stubbedResponse: SearchIdResponse = {
      searchId: stubbedSearchId,
    };

    jest
      // Accessing the protected field `service`
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchSearchId')
      .mockResolvedValue(stubbedResponse);

    await ticketStore.getSearchId();

    expect(ticketStore.searchId).toBe(stubbedSearchId);
  });

  it('should get the `tickets`', async () => {
    const stubbedResponseFirst: TicketResponse = {
      tickets: [stubbedTicket],
      stop: false,
    };

    const stubbedResponseSecond: TicketResponse = {
      tickets: [stubbedAnotherTicket],
      stop: true,
    };

    jest
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchTickets')
      .mockResolvedValueOnce(stubbedResponseFirst);
    jest
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchTickets')
      .mockResolvedValueOnce(stubbedResponseSecond);

    // Ignore getting searchId
    ticketStore.searchId = 'searchId';

    await ticketStore.getTickets();

    expect(ticketStore.tickets).toContainEqual(stubbedTicket);
    expect(ticketStore.tickets).toContainEqual(stubbedAnotherTicket);
  });

  it('should set the `isLoading` to true when call `getTickets()`', () => {
    const stubbedResponse: TicketResponse = {
      tickets: [stubbedTicket],
      stop: true,
    };

    // Ignore getting searchId
    ticketStore.searchId = 'searchId';

    jest
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchTickets')
      .mockResolvedValue(stubbedResponse);

    ticketStore.getTickets();

    expect(ticketStore.isLoading).toBe(true);
  });

  it('should set the `statusCode` to true when call `getTickets()`', () => {
    const stubbedResponse: TicketResponse = {
      tickets: [stubbedTicket],
      stop: true,
    };

    // Ignore getting searchId
    ticketStore.searchId = 'searchId';

    jest
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchTickets')
      .mockResolvedValue(stubbedResponse);

    ticketStore.getTickets();

    expect(ticketStore.statusCode).toBe(null);
  });

  it('should call `getSearchId()` if there isn`t searchId', () => {
    const stubbedResponse: TicketResponse = {
      tickets: [stubbedTicket],
      stop: true,
    };

    jest
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchTickets')
      .mockResolvedValue(stubbedResponse);

    jest.spyOn(ticketStore, 'getSearchId').mockImplementation();

    ticketStore.getTickets();

    expect(ticketStore.getSearchId).toHaveBeenCalled();
  });

  it('should set the `isLoading` to false when tickets were getted', async () => {
    const stubbedResponse: TicketResponse = {
      tickets: [stubbedTicket],
      stop: true,
    };

    jest
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchTickets')
      .mockResolvedValue(stubbedResponse);

    // Ignore getting searchId
    ticketStore.searchId = 'searchId';

    await ticketStore.getTickets();

    expect(ticketStore.isLoading).toBe(false);
  });

  it('should set the `statusCode` if an error occured', async () => {
    jest
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchTickets')
      .mockRejectedValue({
        response: {
          status: 500,
        },
      });

    // Ignore getting searchId
    ticketStore.searchId = 'searchId';

    await ticketStore.getTickets();

    expect(ticketStore.statusCode).toBe(500);
  });

  it('should set the `isLoading` to false if an error occured', async () => {
    jest
      // @ts-ignore
      .spyOn(ticketStore.service, 'fetchTickets')
      .mockRejectedValue({
        response: {
          status: 500,
        },
      });

    // Ignore getting searchId
    ticketStore.searchId = 'searchId';

    await ticketStore.getTickets();

    expect(ticketStore.isLoading).toBe(false);
  });
});
