import ky from 'ky';
import { Dispatch } from '@reduxjs/toolkit';
import { authActions } from '../../slice/authSlice';
import { AuthInfoSchema, AuthSchema } from '../../types/authInfoSchema';
import { URL, userLogin } from './userLogin';

jest.mock('ky');
jest.mock('features/AuthByUsername/model/slice/authSlice');

const mockedKy = ky as jest.Mocked<typeof ky>;
const mockedAuthActions = authActions as jest.Mocked<typeof authActions>;

describe('userLogin', () => {
  const mockAuthData = {
    username: 'testuser',
    password: 'testpass',
  } as AuthSchema;

  const mockAuthInfo = {
    id: 1,
    username: 'testuser',
  } as AuthInfoSchema;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setLoginInfoInfo and return auth info on successful login', async () => {
    mockedKy.post.mockReturnValue({
      json: jest.fn().mockResolvedValue(mockAuthInfo),
    } as any);

    const dispatch = jest.fn() as Dispatch;
    const getState = jest.fn();

    const thunk = userLogin(mockAuthData);
    const result = await thunk(dispatch, getState, {});

    expect(mockedKy.post).toHaveBeenCalledWith(URL, {
      json: mockAuthData,
    });

    expect(dispatch).toHaveBeenCalledWith(
      mockedAuthActions.setLoginInfoInfo(mockAuthInfo),
    );

    expect(result).toEqual({
      payload: mockAuthInfo,
      meta: {
        arg: mockAuthData,
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
      type: 'login/userLogin/fulfilled',
    });
  });

  it('should reject with error message when login fails', async () => {
    const errorMessage = 'Login failed';

    mockedKy.post.mockReturnValue({
      json: jest.fn().mockRejectedValue(new Error(errorMessage)),
    } as any);

    const dispatch = jest.fn() as Dispatch;
    const getState = jest.fn();

    const thunk = userLogin(mockAuthData);
    const result = await thunk(dispatch, getState, {});

    expect(result).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        message: errorMessage,
        name: 'Error',
      }),
      meta: expect.objectContaining({
        arg: mockAuthData,
        requestStatus: 'rejected',
        rejectedWithValue: false,
        requestId: expect.any(String),
      }),
      type: 'login/userLogin/rejected',
    }));
  });
});
