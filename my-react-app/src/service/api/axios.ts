import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: '*/*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
