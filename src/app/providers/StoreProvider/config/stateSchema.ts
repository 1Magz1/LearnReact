import { CounterSchema } from 'entities/Counter';
import { AuthInfoSchema } from 'features/AuthByUsername';
import {
  Action, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { KyInstance } from 'ky';
import { UserProfileSchema } from 'features/UserProfile';
import { ArticleSchema } from 'entities/Article';
import { CommentSchema } from 'entities/Comment';

export interface StateSchema {
  counter: CounterSchema,
  authInfo?: AuthInfoSchema,
  profile?: UserProfileSchema,
  article?: ArticleSchema,
  articleComments?: CommentSchema
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
}

export interface ReducerObject {
  name: StateSchemaKey;
  reducer: Reducer;
}
