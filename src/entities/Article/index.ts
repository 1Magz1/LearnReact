import ArticleComponent from './ui/ArticleComponent/ArticleComponent';
import { Article, ArticleSchema } from './model/schema/articleSchema';
import { articleActions, articleReducer } from './model/slice/articleSlice';
import { getArticleData } from './model/selector/getArticleData/getArticleData';
import { fetchArticleData } from './model/services/fetchArticleData/fetchArticleData';

export {
  ArticleComponent,
  Article,
  ArticleSchema,
  articleActions,
  articleReducer,
  getArticleData,
  fetchArticleData,
};
