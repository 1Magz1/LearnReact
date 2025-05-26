import { StateSchema } from 'app/providers/StoreProvider';

export const getIsInit = ((state: StateSchema) => (state.article ? state.article.isInit : false));
