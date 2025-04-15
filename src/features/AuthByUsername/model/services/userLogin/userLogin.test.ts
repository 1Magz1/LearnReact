import ky from 'ky';
import { authActions } from 'features/AuthByUsername/model/slice/authSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { userLogin, URL } from './userLogin';

jest.mock('ky');
const mockedKy = ky as jest.Mocked<typeof ky>;

describe('userLogin thunk', () => {
  const mockAuthData = {
    username: 'admin',
    password: 'admin',
  };

  const mockResponse = {
    id: 1,
    username: 'admin',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make two POST requests on successful login', async () => {
    // Мокаем успешный ответ от API для обоих запросов
    mockedKy.post
      .mockResolvedValueOnce({
        json: async () => Promise.resolve(mockResponse),
      } as any);

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = {};

    // Вызываем thunk
    await userLogin(mockAuthData)(dispatch, getState, extra);

    // Проверяем, что ky.post был вызван дважды
    expect(mockedKy.post).toHaveBeenCalledTimes(1);

    // Проверяем первый вызов ky.post
    expect(mockedKy.post).toHaveBeenCalledWith(URL, {
      json: mockAuthData,
    });

    // Проверяем, что dispatch был вызван с правильными действиями
    expect(dispatch).toHaveBeenCalledWith(mockAuthData);

    // Проверяем, что thunk возвращает правильные данные
    const result = await userLogin(mockAuthData)(dispatch, getState, extra);
    expect(result).toEqual(mockResponse);
  });
});
