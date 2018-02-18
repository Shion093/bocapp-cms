import axios from 'axios';

const instance = axios.create({
  baseURL : 'http://localhost:7777/v1/',
  timeout : 6000,
});

export default instance;