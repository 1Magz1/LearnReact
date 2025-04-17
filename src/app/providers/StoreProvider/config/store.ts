import {
  Action,
  configureStore,
  ReducersMapObject, ThunkDispatch,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { counterReducer } from 'entities/Counter';
import { createReducerManager } from 'app/providers/StoreProvider/config/reduceManager';
import { $api } from 'shared/api/api';
import type { To } from '@remix-run/router';
import type { NavigateOptions } from 'react-router/dist/lib/context';
import { ReduxStoreWithManager, StateSchema } from '../config/stateSchema';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
): ReduxStoreWithManager {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
      {
        thunk: {
          extraArgument: {
            api: $api,
            navigate,
          },
        },
      },
    ),
  }) as ReduxStoreWithManager;

  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ThunkDispatch<StateSchema, any, Action>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
