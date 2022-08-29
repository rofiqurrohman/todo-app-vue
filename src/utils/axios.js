import axios from 'axios';

axios.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.baseURL = 'https://todo.api.devcode.gethired.id/';
  return config;
});
