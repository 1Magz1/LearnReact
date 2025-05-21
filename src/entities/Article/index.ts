import ArticleComponent from './ui/ArticleComponent/ArticleComponent';
import {
  Article,
  ArticleSchema,
} from './model/schema/articleSchema';
import { articleActions, articleReducer } from './model/slice/articleSlice';
import { getArticleData } from './model/selector/getArticleData/getArticleData';
import { getArticleList } from './model/selector/getArticleList/getArticleList';
import { fetchArticleData } from './model/services/fetchArticleData/fetchArticleData';
import { fetchArticleList } from './model/services/fetchArticleList/fetchArticleList';

export {
  ArticleComponent,
  Article,
  ArticleSchema,
  articleActions,
  articleReducer,
  getArticleData,
  getArticleList,
  fetchArticleData,
  fetchArticleList,
};
