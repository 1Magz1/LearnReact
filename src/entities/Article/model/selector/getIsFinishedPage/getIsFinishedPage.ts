import { StateSchema } from 'app/providers/StoreProvider';

export const getIsFinishedPage = ((state: StateSchema) => (state.article ? state.article.isFinishedPage : false));
