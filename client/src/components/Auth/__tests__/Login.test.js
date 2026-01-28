import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

// Mock axios
jest.mock('axios');

// Mock react-router-dom's useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component Tests', () => {
  
  // Helper function to render Login component with Router
  const renderLogin = (onLoginMock = jest.fn()) => {
    return render(
      <BrowserRouter>
        <Login onLogin={onLoginMock} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Component Renders Correctly
  test('should render login form with all elements', () => {
    renderLogin();

    // Check for heading
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();

    // Check for form fields
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // Check for registration link
    expect(screen.getByText(/register here/i)).toBeInTheDocument();
  });

  // Test Case 2: Form Input Handling
  test('should update input fields when user types', () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    // Type into inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check values
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
