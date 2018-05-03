import axios from 'axios';

const instance = axios.create({
  baseURL : process.env.NODE_ENV === 'development'
    ? 'http://localhost:7777/v1/'
    : 'https://api.bocaapp.com/v1/',
  timeout : 20000,
});

instance.interceptors.request.use(function (config) {
  if (!config.headers) {
    config.headers = {};
  }
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  config.headers.Authorization = token ? `bearer ${token}` : '';
  config.headers['x-refresh-token'] = refreshToken ? refreshToken : '';
  // Do something before request is sent
  return config;
}, function (error) {
  console.log(error);
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  const token = response.headers['x-token'];
  console.log(token)
  const refreshToken = response.headers['x-refresh-token'];
  console.log(refreshToken)
  if (token) {
    localStorage.setItem('token', token);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default instance;