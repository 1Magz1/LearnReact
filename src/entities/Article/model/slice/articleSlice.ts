import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleList } from 'entities/Article/model/services/fetchArticleList/fetchArticleList';
import { fetchArticleData } from '../services/fetchArticleData/fetchArticleData';
import { Article, ArticleSchema } from '../schema/articleSchema';

const initialState: ArticleSchema = {
  articleData: null,
  articleList: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticleData: (state, action: PayloadAction<Article>) => {
      state.articleData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
      state.articleData = action.payload;
    });
    builder.addCase(fetchArticleList.fulfilled, (state, action: PayloadAction<Article[]>) => {
      state.articleList = action.payload;
    });
  },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
