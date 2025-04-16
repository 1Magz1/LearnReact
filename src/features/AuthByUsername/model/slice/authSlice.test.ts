import { authActions, authReducer } from 'features/AuthByUsername';

describe('authReducer', () => {
  it('should return correct info with undefined state', () => {
    const state = {
      username: 'test',
      id: 10,
    };

    expect(authReducer(undefined, authActions.setAuthInfo(state))).toEqual(state);
  });

  it('should return correct info', () => {
    const state = {
      username: '',
      id: -1,
    };

    const data = {
      username: 'test',
      id: 10,
    };

    expect(authReducer(state, authActions.setAuthInfo(data))).toEqual(data);
  });
});
