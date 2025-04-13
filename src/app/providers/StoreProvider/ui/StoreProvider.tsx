import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/stateSchema';

interface StoreProvider {
  children: ReactNode;
  initialState?: StateSchema
}

const StoreProvider = (props: StoreProvider) => {
  const { children, initialState } = props;
  const store = createReduxStore(initialState);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default StoreProvider;
