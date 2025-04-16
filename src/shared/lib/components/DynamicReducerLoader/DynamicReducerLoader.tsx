import { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/stateSchema';
import { Reducer } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/providers/StoreProvider';

export interface ReducerObject {
  name: StateSchemaKey;
  reducer: Reducer;
}

interface DynamicReduceLoaderProps {
  reducerList: ReducerObject[]
  children: ReactNode;
  isReducerDestroy?: boolean;
}

const DynamicReducerLoader = (props: DynamicReduceLoaderProps) => {
  const {
    reducerList, children, isReducerDestroy = false,
  } = props;

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

  return (
    children
  );
};

export default DynamicReducerLoader;
