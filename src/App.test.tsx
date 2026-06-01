import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders prototype viewer overview heading', () => {
  render(<App />);
  expect(screen.getByText(/Main App Overview/i)).toBeInTheDocument();
});
