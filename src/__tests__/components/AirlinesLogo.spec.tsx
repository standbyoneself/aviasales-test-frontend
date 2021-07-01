import { screen, render } from '@testing-library/react';
import AirlinesLogo from '@/components/AirlinesLogo';

describe('AirlinesLogo', () => {
  it('should have correct src', () => {
    render(<AirlinesLogo IATA='S7' />);

    const logo = screen.getByAltText('airlines-logo') as HTMLImageElement;
    expect(logo.src).toContain('http://pics.avs.io/99/36/S7.png');
  });
});
