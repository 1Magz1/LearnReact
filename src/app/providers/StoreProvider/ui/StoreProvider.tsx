import { Provider } from 'react-redux';
import { ReactNode, useMemo } from 'react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/stateSchema';

interface StoreProvider {
  children: ReactNode;
  initialState?: StateSchema
  asyncReducers?: ReducersMapObject<StateSchema>,
}

const StoreProvider = (props: StoreProvider) => {
  const { children, initialState, asyncReducers } = props;
  const store = useMemo(() => createReduxStore(initialState, asyncReducers), []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default StoreProvider;
