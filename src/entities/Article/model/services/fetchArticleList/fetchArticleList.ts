import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticleList = createAsyncThunk<Article[], void, {extra: ThunkExtraArg}>(
  'article/fetchArticleList',
  async (_, thunkAPI) => {
    const { extra } = thunkAPI;
    const response = await extra.api.get('articles').json<Article[]>();

    return response;
  },
);
