import axios from 'axios';

const instance = axios.create({
  baseURL : process.env.NODE_ENV === 'development'
    ? 'http://localhost:7777/v1/'
    : 'https://api.bocaapp.com/v1/',
  timeout : 20000,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? token : '';
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default instance;