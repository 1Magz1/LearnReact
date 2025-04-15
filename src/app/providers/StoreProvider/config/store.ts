import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { counterReducer } from 'entities/Counter';
import { authReducer } from 'features/AuthByUsername';
import { StateSchema } from '../config/stateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
      authInfo: authReducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  return store;
}

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
