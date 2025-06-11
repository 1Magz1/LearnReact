import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleFilters = ((state: StateSchema) => (state.article ? state.article.articleFilters : null));
