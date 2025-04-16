import { StateSchema } from 'app/providers/StoreProvider';
import { getAuthInfo } from './getAuthInfo';

describe('getAuthInfo selector', () => {
  test('should return the correct state', () => {
    const state: Partial<StateSchema> = {
      authInfo: {
        username: 'test',
        id: 100,
      },
    };

    expect(getAuthInfo(state as StateSchema)).toEqual({
      username: 'test',
      id: 100,
    });
  });
});
