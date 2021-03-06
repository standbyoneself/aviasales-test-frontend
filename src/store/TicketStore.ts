import { runInAction, makeAutoObservable } from 'mobx';
import TicketService, { ITicketService } from '../services/TicketService';
import HTTPClient from '../api/HTTPClient';
import {
  Ticket,
  StopFilterValue,
  NumericStopFilterValue,
  SortValue,
} from '../types';
import {
  sortByPrice,
  sortBySpeed,
  sortByStopsCountAndPrice,
} from '../utils/ticketUtils';

const stopFilterValues: StopFilterValue[] = ['all', 0, 1, 2, 3];

export class TicketStore {
  searchId: string = '';
  tickets: Ticket[] = [];
  stopFilterValues: StopFilterValue[] = [...stopFilterValues];
  sortedBy: SortValue = 'cheapest';
  statusCode: number | null = null;
  offsetCoef: number = 1;
  isLoading: boolean = false;

  constructor(private readonly service: ITicketService) {
    this.service = service;
    makeAutoObservable(this);
  }

  get isLoadingError() {
    return !!this.statusCode;
  }

  get fiveTickets() {
    return this.sortedTickets.slice(0, this.offsetCoef * 5);
  }

  get sortedTickets() {
    switch (this.sortedBy) {
      case 'cheapest': {
        return sortByPrice(this.filteredTickets);
      }
      case 'fastest': {
        return sortBySpeed(this.filteredTickets);
      }
      case 'optimal': {
        return sortByStopsCountAndPrice(this.filteredTickets);
      }
      default:
        return sortByPrice(this.filteredTickets);
    }
  }

  get filteredTickets() {
    if (this.stopFilterValues.includes('all')) {
      return this.tickets;
    }

    return this.tickets.filter((ticket) =>
      ticket.segments.some((segment) =>
        this.stopFilterValues.includes(
          segment.stops.length as NumericStopFilterValue
        )
      )
    );
  }

  get isEmptyStopFilterValues() {
    return !this.stopFilterValues.length;
  }

  get restTicketsToShow() {
    return this.tickets.length - this.offsetCoef * 5;
  }

  increaseOffsetCoef() {
    this.offsetCoef++;
  }

  addStopFilterValue(stopFilterValue: StopFilterValue) {
    if (stopFilterValue === 'all') {
      this.stopFilterValues = [...stopFilterValues];
      return;
    } else {
      if (
        !this.stopFilterValues.includes('all') &&
        this.stopFilterValues.length === stopFilterValues.length - 2
      ) {
        this.stopFilterValues = [...this.stopFilterValues, 'all'];
      }
    }

    this.stopFilterValues = [...this.stopFilterValues, stopFilterValue];
  }

  removeStopFilterValue(stopFilterValue: StopFilterValue) {
    if (stopFilterValue === 'all') {
      this.stopFilterValues = [];
    } else {
      this.stopFilterValues = this.stopFilterValues.filter(
        (stopFilterValue) => stopFilterValue !== 'all'
      );
    }

    this.stopFilterValues = this.stopFilterValues.filter(
      (_stopFilterValue) => _stopFilterValue !== stopFilterValue
    );
  }

  sortBy(sortValue: SortValue) {
    this.sortedBy = sortValue;
  }

  async getSearchId() {
    this.searchId = await this.service
      .fetchSearchId()
      .then((response) => response.searchId);
  }

  async getTickets(prevTickets: Ticket[] = [], nextTickets: Ticket[] = []) {
    try {
      this.isLoading = true;
      this.statusCode = null;

      const tickets = [...prevTickets, ...nextTickets];

      if (!this.searchId) {
        await this.getSearchId();
      }

      const { tickets: fetchedTickets, stop } = await this.service.fetchTickets(
        this.searchId
      );

      if (stop === false) {
        await this.getTickets(tickets, fetchedTickets);
        return;
      }

      runInAction(() => {
        this.tickets = [...tickets, ...fetchedTickets];
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.statusCode = error.response.status;
        this.isLoading = false;
      });
    }
  }
}

const ticketService = new TicketService(HTTPClient);
export default new TicketStore(ticketService);
