import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginInfo } from './getLoginInfo';

describe('getLoginInfo selector', () => {
  test('should return the correct state', () => {
    const state: Partial<StateSchema> = {
      authInfo: {
        username: 'test',
        id: 100,
      },
    };

    expect(getLoginInfo(state as StateSchema)).toEqual({
      username: 'test',
      id: 100,
    });
  });
});
