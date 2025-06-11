import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from 'app/providers/StoreProvider';
import { getArticleData } from 'entities/Article';
import { AddCommentFormState } from 'entities/AddCommentForm';
import { LOCAL_STORAGE_USERNAME_ID_KEY } from 'shared/constants';

export const sendComment = createAsyncThunk<string, AddCommentFormState, {extra: ThunkExtraArg}>(
  'article/sendComment',
  async (data, thunkAPI) => {
    const { extra, getState } = thunkAPI;

    const userId = localStorage.getItem(LOCAL_STORAGE_USERNAME_ID_KEY);
    const article = getArticleData(getState() as StateSchema);

    if (!userId || !article) {
      isRejectedWithValue('no data');
    }
    const response = await extra.api.post('comments', {
      json: {
        text: data.text,
        userId: userId ? JSON.parse(userId) : '-1',
        articleId: article?.id,
      },
    }).json<string>();

    return response;
  },
);
