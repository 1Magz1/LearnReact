import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginInfo = (state: StateSchema) => state.authInfo;
