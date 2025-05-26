import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from 'app/providers/StoreProvider';
import { Article, articleActions } from 'entities/Article';
import { getCurrentArticlePage } from '../../selector/getCurrentArticlePage/getCurrentArticlePage';
import { getIsFinishedPage } from '../../selector/getIsFinishedPage/getIsFinishedPage';

export const fetchArticleList = createAsyncThunk<Article[], void, {extra: ThunkExtraArg}>(
  'article/fetchArticleList',
  async (_, thunkAPI) => {
    const { extra, getState } = thunkAPI;
    const isFinished = getIsFinishedPage(getState() as StateSchema);

    if (isFinished) return [];

    const page = getCurrentArticlePage(getState() as StateSchema);

    const response = await extra.api.get(`articles?_page=${page}`).json<Article[]>();

    if (response.length > 0) {
      thunkAPI.dispatch(articleActions.setArticleCurrentPage(page + 1));
      thunkAPI.dispatch(articleActions.setIsInit(true));
    } else {
      thunkAPI.dispatch(articleActions.setIsFinishedPage(true));
    }

    return response;
  },
);
