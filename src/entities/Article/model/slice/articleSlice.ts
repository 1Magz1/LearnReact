import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleList } from 'entities/Article/model/services/fetchArticleList/fetchArticleList';
import { fetchArticleData } from '../services/fetchArticleData/fetchArticleData';
import { Article, ArticleSchema } from '../schema/articleSchema';

const initialState: ArticleSchema = {
  articleData: null,
  articleList: null,
  currentArticlePage: 1,
  isFinishedPage: false,
  isInit: false,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticleCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentArticlePage = action.payload;
    },
    setIsFinishedPage: (state, action: PayloadAction<boolean>) => {
      state.isFinishedPage = action.payload;
    },
    setIsInit: (state, action: PayloadAction<boolean>) => {
      state.isInit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
      state.articleData = action.payload;
    });
    builder.addCase(fetchArticleList.fulfilled, (state, action: PayloadAction<Article[]>) => {
      if (!state.articleList) {
        state.articleList = action.payload;
      } else {
        state.articleList = [...state.articleList, ...action.payload];
        state.articleList = state.articleList.filter(
          (
            article,
            index,
            arr,
          ) => arr.findIndex((a) => a.id === article.id) === index,
        );
      }
    });
  },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
