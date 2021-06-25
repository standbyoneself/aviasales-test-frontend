import { screen, render } from '@testing-library/react';
import Error from '../components/Error';

describe('Error', () => {
  it('should render correctly', () => {
    render(<Error statusCode={404} />);

    expect(screen.getByText('№ 404')).toBeInTheDocument();
  });
});
