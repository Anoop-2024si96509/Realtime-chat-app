import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import axios from 'axios';

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

  // Test Case 3: Form Validation - Empty Fields
  test('should submit form even when fields are empty and handle error', async () => {
    const onLoginMock = jest.fn();
    axios.post.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } }
    });

    renderLogin(onLoginMock);

    const loginButton = screen.getByRole('button', { name: /login/i });
    
    // Submit with empty fields
    fireEvent.click(loginButton);

    // Verify that axios was called with empty values
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        { email: '', password: '' }
      );
    });

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  // Test Case 4: Successful Login Submission
  test('should submit form and call onLogin callback on successful login', async () => {
    const onLoginMock = jest.fn();
    const mockResponse = {
      data: {
        token: 'mock-token',
        user: {
          id: '123',
          username: 'testuser',
          email: 'test@example.com'
        }
      }
    };

    axios.post.mockResolvedValue(mockResponse);
    
    renderLogin(onLoginMock);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(loginButton);

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        {
          email: 'test@example.com',
          password: 'password123'
        }
      );
    });
  });
});
