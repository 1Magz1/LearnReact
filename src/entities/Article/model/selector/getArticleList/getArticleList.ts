import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleList = ((state: StateSchema) => (state.article ? state.article.articleList : null));
