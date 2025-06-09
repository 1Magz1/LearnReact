import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchArticleComments = createAsyncThunk<Comment[], string, {extra: ThunkExtraArg}>(
  'article/fetchArticleComments',
  async (id, thunkAPI) => {
    const { extra } = thunkAPI;
    const response = await extra.api.get(`comments/?articleId=${id}&_expand=user`).json<Comment[]>();

    return response.reverse();
  },
);
