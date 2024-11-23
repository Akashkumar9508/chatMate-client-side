import config from '../config/config.js';
import axios from 'axios';

export class AuthSerivce{
  API;

  constructor(){
    this.API=axios.create({
      baseURL:`${config.apiUrl}/api/auth`,
    });
  }
  async createAccount(){
    try {
      const response = await this.API.post('/register', {
        email: 'your_email',
        password: 'your_password',
        username: 'your_username',
      });
      return response.data;
    } catch (error) {
      console.log("Error creating account : ", error);
      throw error;
    }
  }

  async login(){
    try {
      const response = await this.API.post('/login', {
        email: 'your_email',
        password: 'your_password',
      });
      return response.data;
    } catch (error) {
      console.log("Error logging in : ", error);
      throw error;
    }
  }
}

const authService = new AuthSerivce();

export default authService;