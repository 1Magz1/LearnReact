import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { articleActions } from '../../slice/articleSlice';
import { Article } from '../../schema/articleSchema';

export const fetchArticleData = createAsyncThunk<Article, string, {extra: ThunkExtraArg}>(
  'article/fetchArticleData',
  async (id, thunkAPI) => {
    const { extra, dispatch } = thunkAPI;

    const response = await extra.api.get(`articles/${id}`).json<Article>();
    dispatch(articleActions.setArticle(response));

    return response;
  },
);
