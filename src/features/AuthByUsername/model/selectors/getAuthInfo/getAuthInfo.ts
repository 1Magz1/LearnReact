import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthInfo = (state: StateSchema) => (state.authInfo ? state.authInfo : null);
