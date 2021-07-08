import HTTPService from './HTTPService';
import { SearchIdResponse, TicketResponse } from '../types';

export interface ITicketService {
  fetchSearchId: () => Promise<SearchIdResponse>;
  fetchTickets: (searchId: string) => Promise<TicketResponse>;
}

export default class TicketService
  extends HTTPService
  implements ITicketService
{
  async fetchSearchId() {
    return this.client
      .get<SearchIdResponse>('/search')
      .then((response) => response.data);
  }

  async fetchTickets(searchId: string) {
    return this.client
      .get<TicketResponse>(`/tickets?searchId=${searchId}`)
      .then((response) => response.data);
  }
}
