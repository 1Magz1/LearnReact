import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleData } from '../services/fetchArticleData/fetchArticleData';
import { Article, ArticleSchema } from '../schema/articleSchema';

const initialState: ArticleSchema = {
  data: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle: (state, action: PayloadAction<Article>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
      state.data = action.payload;
    });
  },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
