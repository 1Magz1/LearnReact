import { StateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
  test('should return the counter value', () => {
    const state: Partial<StateSchema> = {
      counter: {
        value: 1,
      },
    };

    expect(getCounterValue(state as StateSchema)).toEqual(1);
  });
});
