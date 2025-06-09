import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from 'app/providers/StoreProvider';
import { Article, articleActions } from 'entities/Article';
import { getArticleFilters } from 'entities/Article/model/selector/getArticleFilters/getArticleFilters';
import { getCurrentArticlePage } from '../../selector/getCurrentArticlePage/getCurrentArticlePage';
import { getIsFinishedPage } from '../../selector/getIsFinishedPage/getIsFinishedPage';

export const fetchArticleList = createAsyncThunk<Article[], void, {extra: ThunkExtraArg}>(
  'article/fetchArticleList',
  async (_, thunkAPI) => {
    const { extra, getState } = thunkAPI;
    const isFinished = getIsFinishedPage(getState() as StateSchema);

    if (isFinished) return [];

    const page = getCurrentArticlePage(getState() as StateSchema);
    const filter = getArticleFilters(getState() as StateSchema);

    // eslint-disable-next-line max-len
    const response = await extra.api.get(`articles?_page=${page}&_order=${filter?.order}&_sort=${filter?.sort}&_search=${filter?.search}`).json<Article[]>();

    if (response.length < 10) {
      thunkAPI.dispatch(articleActions.setIsFinishedPage(true));
    } else {
      thunkAPI.dispatch(articleActions.setArticleCurrentPage(page + 1));
      thunkAPI.dispatch(articleActions.setIsInit(true));
    }

    return response;
  },
);
