import axios from 'axios';

// http://localhost:7777/v1/
// 'https://api.bocaapp.com/v1/'
const instance = axios.create({
  baseURL : 'http://localhost:7777/v1/',
  timeout : 20000,
});

export default instance;