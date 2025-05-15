import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchArticleComments } from '../../model/service/fetchArticleComments/fetchArticleComments';

const commentsAdapter = createEntityAdapter({
  selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleComments || commentsAdapter.getInitialState(),
);

const articleDetailsSlice = createSlice({
  name: 'articleDetailsSlice',
  initialState: commentsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleComments.fulfilled, (state, action) => {
      commentsAdapter.setAll(state, action.payload);
    });
  },
});

export const { reducer: articleCommentsReducer } = articleDetailsSlice;
