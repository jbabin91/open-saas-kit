import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Example test', () => {
  it('should render correctly', () => {
    render(<div data-testid="test">Hello World</div>);
    expect(screen.getByTestId('test')).toHaveTextContent('Hello World');
  });
});
