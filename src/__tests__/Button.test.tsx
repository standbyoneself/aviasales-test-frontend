import { screen, render, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button text='Touch me' />);

    const button = screen.getByTestId('button');

    expect(button).toHaveTextContent('Touch me');
    expect(button).toHaveClass('button');
  });

  it('should execute onClick callback', () => {
    const fn = jest.fn();

    render(<Button text='Touch me' onClick={() => fn()} />);

    const button = screen.getByTestId('button');

    fireEvent.click(button);

    expect(fn).toHaveBeenCalled();
  });

  it('should accept inline styles correctly', () => {
    render(<Button text='Touch me' style={{ marginTop: 20, color: 'pink' }} />);

    const button = screen.getByTestId('button');

    expect(button).toHaveStyle({ marginTop: 20, color: 'pink' });
  });
});
