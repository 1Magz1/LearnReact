import ky from 'ky';
import { LOCAL_STORAGE_USERNAME_KEY } from 'shared/constants';

export const $api = ky.extend({
  prefixUrl: 'http://localhost:8000/',
  headers: {
    Authorization: localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) || '',
  },
});
