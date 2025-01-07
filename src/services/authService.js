import config from '../config/config.js';
import axios from 'axios';

export class AuthService {
  API;

  constructor() {
    this.API = axios.create({
      baseURL: `${config.apiUrl}/api/auth`,
      withCredentials: true,
    });
  }

  // Signup
  async createAccount(fullName, userName, email, password, avatar) {
    try {
      const response = await this.API.post('/signup', {
        fullName,
        userName,
        email,
        password,
        avatar,
      });
      this.login({ email, password });
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.response?.data || error.message);
      throw error;
    }
  }

  // Login
  async login({ email, password }) {
    try {
      const response = await this.API.post('/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      const response = await this.API.post('/logout');
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await this.API.get('/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const response = await this.API.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(id) {
    try {
      const response = await this.API.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error.response?.data || error.message);
      throw error;
    }
  }
  // update the user Id
  async updateAvatar(formData){
    try {
      const response = await this.API.post('/updateAvatar',formData,{
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error){
      console.error('error Updation of Avatar',error.response.data || error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
