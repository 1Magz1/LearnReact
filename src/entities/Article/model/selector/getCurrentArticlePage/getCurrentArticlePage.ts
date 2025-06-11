import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrentArticlePage = ((state: StateSchema) => (state.article ? state.article.currentArticlePage : 1));
