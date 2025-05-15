import ky from 'ky';
import { LOCAL_STORAGE_USERNAME_KEY } from 'shared/constants';

export const $api = ky.extend({
  prefixUrl: 'http://localhost:8000/',
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
        if (token) {
          request.headers.set('Authorization', token);
        }
      },
    ],
  },
});
