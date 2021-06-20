import HTTPService from './HTTPService';
import { SearchIdResponse, TicketResponse } from '../types';

export default class TicketService extends HTTPService {
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
