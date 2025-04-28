import { renderHook } from '@testing-library/react';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/stateSchema';
import useReducerLoader, { ReducerObject } from './useReducerLoader';

const mockReducer1: Reducer = (state = {}) => state;
const mockReducer2: Reducer = (state = {}) => state;

const mockReducerManager = {
  getReducerMap: jest.fn(),
  add: jest.fn(),
  remove: jest.fn(),
  reduce: jest.fn(),
};

const mockStore = {
  reducerManager: mockReducerManager,
} as unknown as ReduxStoreWithManager;

jest.mock('react-redux', () => ({
  useStore: () => mockStore,
}));

jest.mock('app/providers/StoreProvider', () => ({
  useAppDispatch: () => jest.fn(),
}));

describe('useReducerLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReducerManager.getReducerMap.mockReturnValue({});
  });

  it('should add reducers on mount', () => {
    const reducerList = [
      { name: 'testReducer1' as const, reducer: mockReducer1 },
      { name: 'testReducer2' as const, reducer: mockReducer2 },
    ] as unknown as ReducerObject[];

    renderHook(() => useReducerLoader(reducerList));

    expect(mockReducerManager.add).toHaveBeenCalledTimes(2);
    expect(mockReducerManager.add).toHaveBeenCalledWith('testReducer1', mockReducer1);
    expect(mockReducerManager.add).toHaveBeenCalledWith('testReducer2', mockReducer2);
  });

  it('should not add reducers if they already exist', () => {
    mockReducerManager.getReducerMap.mockReturnValue({
      testReducer1: mockReducer1,
    });

    const reducerList = [
      { name: 'testReducer1' as const, reducer: mockReducer1 },
      { name: 'testReducer2' as const, reducer: mockReducer2 },
    ] as unknown as ReducerObject[];

    renderHook(() => useReducerLoader(reducerList));

    expect(mockReducerManager.add).toHaveBeenCalledTimes(1);
    expect(mockReducerManager.add).toHaveBeenCalledWith('testReducer2', mockReducer2);
  });

  it('should remove reducers on unmount when isReducerDestroy is true', () => {
    const reducerList = [
      { name: 'testReducer1', reducer: mockReducer1 },
    ] as unknown as ReducerObject[];

    const { unmount } = renderHook(() => useReducerLoader(reducerList, true));

    unmount();

    expect(mockReducerManager.remove).toHaveBeenCalledTimes(1);
    expect(mockReducerManager.remove).toHaveBeenCalledWith('testReducer1');
  });

  it('should not remove reducers on unmount when isReducerDestroy is false', () => {
    const reducerList = [
      { name: 'testReducer1' as const, reducer: mockReducer1 },
    ] as unknown as ReducerObject[];

    const { unmount } = renderHook(() => useReducerLoader(reducerList));

    unmount();

    expect(mockReducerManager.remove).not.toHaveBeenCalled();
  });
});
