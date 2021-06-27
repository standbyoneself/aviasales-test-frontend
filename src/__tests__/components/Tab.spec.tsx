import { screen, render, fireEvent } from '@testing-library/react';
import Tab from '@/components/Tab';

describe('Tab', () => {
  it('should render title correctly', () => {
    render(<Tab title='Самый быстрый' />);

    const tab = screen.getByTestId('tab');

    expect(tab).toHaveTextContent('Самый быстрый');
  });

  it('should execute onClick callback', () => {
    const fn = jest.fn();

    render(<Tab title='Самый быстрый' onClick={fn} />);

    const tab = screen.getByTestId('tab');

    fireEvent.click(tab);

    expect(fn).toHaveBeenCalled();
  });

  it('should apply className', () => {
    render(<Tab title='Самый быстрый' className='selected' />);

    const tab = screen.getByTestId('tab');

    expect(tab).toHaveClass('selected');
  });
});
