import { StateSchema, ThunkExtraArg } from './config/stateSchema';
import { createReduxStore, useAppDispatch } from './config/store';
import StoreProvider from './ui/StoreProvider';

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  useAppDispatch,
  ThunkExtraArg,
};
