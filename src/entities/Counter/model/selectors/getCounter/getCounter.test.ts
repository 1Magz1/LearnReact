import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter', () => {
  test('should return the counter state', () => {
    const state: Partial<StateSchema> = {
      counter: {
        value: 1,
      },
    };

    expect(getCounter(state as StateSchema)).toEqual({ value: 1 });
  });
});
