import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileData = (state: StateSchema) => (state.profile ? state.profile.data : null);
