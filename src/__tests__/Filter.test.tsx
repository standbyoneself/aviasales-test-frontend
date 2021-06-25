import { screen, render } from '@testing-library/react';
import Filter from '../components/Filter';
import { StopFilterRecord } from '../types';

const stopFilters: StopFilterRecord[] = [
  {
    Все: 'all',
  },
  { '1 пересадка': 1 },
];

describe('Filter', () => {
  it('should have title', () => {
    render(<Filter stopFilters={stopFilters} />);

    expect(screen.getByText('Количество пересадок')).toBeInTheDocument();
  });

  it('should have form', () => {
    render(<Filter stopFilters={stopFilters} />);

    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
  });

  it('should render inputs accordingly with passed props', () => {
    render(<Filter stopFilters={stopFilters} />);

    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('1 пересадка')).toBeInTheDocument();
  });
});
