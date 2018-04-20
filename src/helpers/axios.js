import axios from 'axios';

const instance = axios.create({
  baseURL : 'https://api.bocaapp.com/v1/',
  timeout : 20000,
});

export default instance;