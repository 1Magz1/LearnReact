import { counterReducer, counterActions } from './counterSlice';

describe('counterReducer', () => {
  test('should return 0 after decrement', () => {
    const state = {
      value: 1,
    };

    expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 0 });
  });

  test('should return 2 after decrement', () => {
    const state = {
      value: 1,
    };

    expect(counterReducer(state, counterActions.increment())).toEqual({ value: 2 });
  });

  test('should return -1 after decrement with undefined state', () => {
    expect(counterReducer(undefined, counterActions.decrement())).toEqual({ value: -1 });
  });
});
