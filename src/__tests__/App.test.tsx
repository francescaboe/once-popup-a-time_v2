// src/App.test.tsx
import React from 'react';
import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  const headingElement = screen.getByText(/welcome to react/i);
  expect(headingElement).toBeInTheDocument(); // Use custom matcher
  expect(headingElement).toHaveClass('text-2xl'); // Example Tailwind CSS class
});
