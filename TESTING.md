# Test Suite Documentation

## Overview
This document describes the test cases implemented for the Real-time Chat Application.

## ? Test Results Summary

- **Backend Tests:** 4 tests passing ?
- **Frontend Tests:** 2 tests passing ?
- **Total Tests:** 6 tests passing
- **Code Coverage:** 51.61% (auth routes: 74%)

---

## Test Structure

### Backend Tests (Node.js + Jest + Supertest)
Location: `server/__tests__/auth.test.js`

### Frontend Tests (React + Jest + React Testing Library)
Location: `client/src/components/Auth/__tests__/Login.test.js`

---

## Backend Tests

### Authentication API Tests

**File:** `server/__tests__/auth.test.js`

#### ? Test Case 1: User Registration - Success
- **Description:** Tests successful user registration with valid data
- **Endpoint:** `POST /api/auth/register`
- **Test Data:**
  - username: "testuser"
  - email: "test@example.com"
  - password: "password123"
- **Expected Results:**
  - Status Code: 201 ?
  - Response contains JWT token ?
  - Response contains user object with username and email ?
  - Success message: "User registered successfully" ?
- **Status:** PASSING ?

#### ? Test Case 2: User Registration - Duplicate User
- **Description:** Tests registration attempt with existing username/email
- **Endpoint:** `POST /api/auth/register`
- **Expected Results:**
  - Status Code: 400 ?
  - Error message: "User already exists" ?
- **Status:** PASSING ?

#### ? Test Case 3: User Login - Success
- **Description:** Tests successful login with correct credentials
- **Endpoint:** `POST /api/auth/login`
- **Test Data:**
  - email: "test@example.com"
  - password: "password123"
- **Expected Results:**
  - Status Code: 200 ?
  - Response contains JWT token ?
  - Response contains user object ?
  - User status updated to "online" ?
  - Success message: "Login successful" ?
- **Status:** PASSING ?

#### ? Test Case 4: User Login - Invalid Credentials
- **Description:** Tests login attempt with wrong credentials
- **Endpoint:** `POST /api/auth/login`
- **Test Data:**
  - email: "wrong@example.com"
  - password: "wrongpassword"
- **Expected Results:**
  - Status Code: 401 ?
  - Error message: "Invalid credentials" ?
- **Status:** PASSING ?

---

## Frontend Tests

### Login Component Tests

**File:** `client/src/components/Auth/__tests__/Login.test.js`

#### ? Test Case 1: Component Rendering
- **Description:** Verifies all form elements render correctly
- **Checks:**
  - "Welcome Back" heading is present ?
  - Email input field exists ?
  - Password input field exists ?
  - Login button is visible ?
  - Registration link is displayed ?
- **Status:** PASSING ?

#### ? Test Case 2: Form Input Handling
- **Description:** Tests input field updates when user types
- **User Actions:**
  1. Enter email: "test@example.com" ?
  2. Enter password: "password123" ?
- **Expected Results:**
  - Email input value updated correctly ?
  - Password input value updated correctly ?
- **Status:** PASSING ?

---

## Running the Tests

### Backend Tests Only

```bash
# Run backend tests with coverage
npm run test:backend

# Output:
# PASS  server/__tests__/auth.test.js
#   Authentication API Tests
#     POST /api/auth/register
#       ? should register a new user with valid data (101 ms)
#       ? should return 400 if user already exists (7 ms)
#     POST /api/auth/login
#       ? should login user with correct credentials (6 ms)
#       ? should return 401 with invalid credentials (7 ms)
# 
# Test Suites: 1 passed, 1 total
# Tests:       4 passed, 4 total
```

### Frontend Tests Only

```bash
# Navigate to client directory
cd client

# Run frontend tests
npm test -- --watchAll=false

# Output:
# PASS  src/components/Auth/__tests__/Login.test.js
#   Login Component Tests
#     ? should render login form with all elements (165 ms)
#     ? should update input fields when user types (14 ms)
#
# Test Suites: 1 passed, 1 total
# Tests:       2 passed, 2 total
```

### Run All Tests

```bash
# From root directory - runs both backend and frontend
npm run test:all

# Or run individually:
npm run test:backend      # Backend only
cd client && npm test     # Frontend only
```

---

## Code Coverage Report

```
------------|---------|----------|---------|---------|-----------------------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                 
------------|---------|----------|---------|---------|-----------------------------------
All files   |   51.61 |    29.16 |   33.33 |   52.17 |                                   
 middleware |   17.24 |        0 |       0 |   17.24 |                                   
  auth.js   |   17.24 |        0 |       0 |   17.24 | 6-30,36-47                        
 models     |   42.85 |        0 |       0 |   46.15 |                                   
  User.js   |   42.85 |        0 |       0 |   46.15 | 42-49,55                          
 routes     |      74 |       70 |      60 |      74 |                                   
  auth.js   |      74 |       70 |      60 |      74 | 22,51-52,63,78,99-100,106,119-124 
------------|---------|----------|---------|---------|-----------------------------------
```

**Key Metrics:**
- **Authentication Routes:** 74% coverage
- **User Model:** 42.85% coverage
- **Auth Middleware:** 17.24% coverage

---

## Test Technologies

### Backend
- ? **Jest:** JavaScript testing framework
- ? **Supertest:** HTTP assertion library for Express APIs
- ? **Mocking:** User model, JWT tokens

### Frontend
- ? **Jest:** Test runner and assertion library
- ? **React Testing Library:** Component testing utilities
- ? **@testing-library/jest-dom:** Custom DOM matchers
- ? **Mocking:** Axios, React Router navigation

---

## Future Test Coverage

### Recommended Additional Tests
- [ ] Message creation and retrieval endpoints
- [ ] Room management (create, join, leave) endpoints
- [ ] Socket.io connection and event handling
- [ ] ChatRoom component functionality
- [ ] RoomList component functionality
- [ ] User presence tracking
- [ ] Typing indicators logic
- [ ] Integration tests for complete user flows

---

## Test Best Practices Used

1. ? **Isolation:** Each test is independent
2. ? **Mocking:** External dependencies are mocked (database, APIs)
3. ? **Clear Assertions:** Meaningful expectations with descriptive messages
4. ? **Coverage:** Both success and failure scenarios tested
5. ? **Cleanup:** beforeEach clears all mocks
6. ? **Descriptive Names:** Test descriptions clearly state what is being tested

---

## CI/CD Integration

These tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install Dependencies
        run: npm run install-all
      
      - name: Run Backend Tests
        run: npm run test:backend
      
      - name: Run Frontend Tests
        run: cd client && npm test -- --watchAll=false
```

---

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error (Backend)**
   - ? Tests mock the User model, so MongoDB doesn't need to be running

2. **Module Not Found**
   - Solution: `npm install` and `cd client && npm install`

3. **Port Already in Use**
   - ? Tests don't start actual server, use supertest

4. **React Router Warnings**
   - These are deprecation warnings and don't affect test results

---

## Quick Start

```bash
# 1. Install all dependencies
npm run install-all

# 2. Run backend tests
npm run test:backend

# 3. Run frontend tests
cd client && npm test -- --watchAll=false

# 4. View coverage report
npm run test:backend
# Coverage report appears in terminal
```

---

## Contributing Test Cases

When adding new features, include tests:

1. **Backend API Tests:**
   - Create test file in `server/__tests__/`
   - Mock database models
   - Test success and error scenarios
   - Verify status codes and response data

2. **Frontend Component Tests:**
   - Create test file in `client/src/components/[ComponentName]/__tests__/`
   - Test rendering, user interactions, and state changes
   - Mock API calls and navigation
   - Verify UI elements and behavior

**Target:** Maintain >70% code coverage

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Supertest GitHub](https://github.com/visionmedia/supertest)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Test Status:** ? All 6 tests passing
**Last Updated:** 2024
