import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
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
  const navigate = useNavigate();
  const store = createReduxStore(initialState, asyncReducers, navigate);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default StoreProvider;
