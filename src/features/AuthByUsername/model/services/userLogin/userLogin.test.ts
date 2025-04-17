import { Dispatch } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider/config/stateSchema';
import { authActions } from '../../slice/authSlice';
import { AuthInfoSchema, AuthSchema } from '../../types/authInfoSchema';
import { userLogin } from './userLogin';

jest.mock('../../slice/authSlice');

const mockedAuthActions = authActions as jest.Mocked<typeof authActions>;

describe('userLogin (with extra.api)', () => {
  const mockAuthData: AuthSchema = {
    username: 'testuser',
    password: 'testpass',
  };

  const mockAuthInfo: AuthInfoSchema = {
    id: 1,
    username: 'testuser',
  };

  const mockApi = {
    post: jest.fn().mockReturnValue({
      json: jest.fn().mockResolvedValue(mockAuthInfo),
    }),
  };

  const extra: ThunkExtraArg = {
    api: mockApi as any,
  };

  const dispatch = jest.fn() as Dispatch;
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setAuthInfo and return auth info on success', async () => {
    const thunk = userLogin(mockAuthData);
    const result = await thunk(dispatch, getState, extra);

    expect(mockApi.post).toHaveBeenCalledWith('login', { json: mockAuthData });

    expect(dispatch).toHaveBeenCalledWith(
      mockedAuthActions.setAuthInfo(mockAuthInfo),
    );

    expect(result).toEqual(expect.objectContaining({
      payload: mockAuthInfo,
      type: 'login/userLogin/fulfilled',
    }));
  });

  it('should reject with error message on failure', async () => {
    const errorMessage = 'Login failed';
    mockApi.post.mockReturnValueOnce({
      json: jest.fn().mockRejectedValue(new Error(errorMessage)),
    });

    const thunk = userLogin(mockAuthData);
    const result = await thunk(dispatch, getState, extra);

    expect(result).toEqual(expect.objectContaining({
      error: expect.any(Object),
      type: 'login/userLogin/rejected',
    }));
  });
});
