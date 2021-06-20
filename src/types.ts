export interface Ticket {
  price: number;
  carrier: string;
  segments: [
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    }
  ];
}

export interface SearchIdResponse {
  searchId: string;
}

export interface TicketResponse {
  tickets: Ticket[];
  stop: boolean;
}

export type StopFilterName =
  | 'Все'
  | 'Без пересадок'
  | '1 пересадка'
  | '2 пересадки'
  | '3 пересадки';
export type StopFilterValue = 'all' | 0 | 1 | 2 | 3;
export type NumericStopFilterValue = Exclude<StopFilterValue, 'all'>;
export type StopFilterRecord = Partial<Record<StopFilterName, StopFilterValue>>;

export type SortName = 'Самый дешевый' | 'Самый быстрый' | 'Оптимальный';
export type SortValue = 'cheapest' | 'fastest' | 'optimal';
export type SortRecord = Partial<Record<SortName, SortValue>>;
