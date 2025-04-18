import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/stateSchema';
import { Reducer } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/providers/StoreProvider';

export interface ReducerObject {
  name: StateSchemaKey;
  reducer: Reducer;
}

export default function useReducerLoader(reducerList: ReducerObject[], isReducerDestroy = false) {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    reducerList.forEach(({ name, reducer }) => {
      if (!store.reducerManager.getReducerMap()[name]) {
        store.reducerManager.add(name, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (isReducerDestroy) {
        reducerList.forEach(({ name }) => {
          store.reducerManager.remove(name);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, []);
}
