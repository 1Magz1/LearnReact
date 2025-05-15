import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { ReducerObject, ReduxStoreWithManager } from 'app/providers/StoreProvider/config/stateSchema';
import { useAppDispatch } from 'app/providers/StoreProvider';

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
