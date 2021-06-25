import { StopFilterRecord } from './types';

export const BASE_URL = 'https://front-test.beta.aviasales.ru';

export const stopFilters: StopFilterRecord[] = [
  { Все: 'all' },
  { 'Без пересадок': 0 },
  { '1 пересадка': 1 },
  { '2 пересадки': 2 },
  { '3 пересадки': 3 },
];
