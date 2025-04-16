import { getStatusCodeFromError } from './getStatusCodeFromError';

describe('getStatusCodeFromError', () => {
  test('should return an error if the message does not exist', () => {
    expect(getStatusCodeFromError('')).toEqual(0);
  });

  test('should return an error code is 403 from message', () => {
    const message = 'Request failed with status code 403 Forbidden: POST http://localhost:8000/login';
    expect(getStatusCodeFromError(message)).toEqual(403);
  });

  test('should return an error code is 500 from message', () => {
    const message = 'Request failed with status code 500 Forbidden: POST http://localhost:8000/login';
    expect(getStatusCodeFromError(message)).toEqual(500);
  });
});
