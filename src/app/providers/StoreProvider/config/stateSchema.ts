import { CounterSchema } from 'entities/Counter';
import { AuthInfoSchema } from 'features/AuthByUsername';
import {
  Action, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { KyInstance } from 'ky';
import type { To } from '@remix-run/router';
import type { NavigateOptions } from 'react-router/dist/lib/context';
import { UserProfileScheme } from 'features/UserProfile';

export interface StateSchema {
  counter: CounterSchema,
  authInfo?: AuthInfoSchema,
  profile?: UserProfileScheme
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: Action) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: KyInstance,
  navigate: (to: To, options?: NavigateOptions) => void;
}
