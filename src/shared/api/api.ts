import ky from 'ky';

export const $api = ky.extend({
  prefixUrl: 'http://localhost:8000/',
  headers: {
    Authorization: localStorage.getItem('USER_NAME') || '',
  },
});
