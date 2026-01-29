const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');

// Create a test Express app
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Mock the User model
jest.mock('../models/User');
const User = require('../models/User');

// Mock JWT
jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

describe('Authentication API Tests', () => {
  
  // Test Case 1: User Registration
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      // Mock user data
      const mockUser = {
        _id: '123456789',
        username: 'testuser',
        email: 'test@example.com',
        avatar: 'https://ui-avatars.com/api/?background=random',
        save: jest.fn().mockResolvedValue(true)
      };

      // Mock User.findOne to return null (user doesn't exist)
      User.findOne = jest.fn().mockResolvedValue(null);
      
      // Mock User constructor
      User.mockImplementation(() => mockUser);

      // Mock JWT token generation
      jwt.sign = jest.fn().mockReturnValue('mock-jwt-token');

      // Make request
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe('testuser');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.message).toBe('User registered successfully');
    });

    it('should return 400 if user already exists', async () => {
      // Mock existing user
      User.findOne = jest.fn().mockResolvedValue({
        _id: '123',
        username: 'existinguser',
        email: 'existing@example.com'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'existinguser',
          email: 'existing@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User already exists');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser'
          // Missing email and password
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(Array.isArray(response.body.errors)).toBe(true);
    });
  });

  // Test Case 2: User Login
  describe('POST /api/auth/login', () => {
    it('should login user with correct credentials', async () => {
      // Mock user with comparePassword method
      const mockUser = {
        _id: '123456789',
        username: 'testuser',
        email: 'test@example.com',
        avatar: 'https://ui-avatars.com/api/?background=random',
        status: 'offline',
        comparePassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true)
      };

      // Mock User.findOne to return the mock user
      User.findOne = jest.fn().mockResolvedValue(mockUser);

      // Mock JWT token generation
      jwt.sign = jest.fn().mockReturnValue('mock-jwt-token');

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe('testuser');
      expect(response.body.message).toBe('Login successful');
      expect(mockUser.status).toBe('online');
    });

    it('should return 401 with invalid credentials', async () => {
      // Mock User.findOne to return null (user not found)
      User.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return 401 when password is incorrect', async () => {
      // Mock user with comparePassword returning false
      const mockUser = {
        _id: '123456789',
        username: 'testuser',
        email: 'test@example.com',
        comparePassword: jest.fn().mockResolvedValue(false)
      };

      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
      expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongpassword');
    });
  });
});
