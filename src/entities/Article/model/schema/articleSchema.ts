import { z } from 'zod';

export enum BookType {
  TEXT = 'TEXT',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
}

interface BaseBlockType {
  id: string;
  type: BookType
}

export interface CodeBlockType extends BaseBlockType{
  type:BookType.CODE;
  code: string;
}

export interface ImageBlockType extends BaseBlockType {
  type:BookType.IMAGE,
  src: string;
  title?: string;
}

export interface TextBlockType extends BaseBlockType {
  type:BookType.TEXT,
  title?: string;
  paragraphs: string[]
}

export type BlockType = CodeBlockType | ImageBlockType | TextBlockType;

export enum ArticleSortField {
  CREATED_AT = 'createdAt',
  VIEWS = 'views',
  TITLE = 'title',
}

export enum OrderBy {
  DESC = 'desc',
  ASC = 'asc',
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number
  createdAt: number;
  tags: string[],
  blocks: BlockType[],
  userId: string
}

export interface ArticleFilters {
  sort: ArticleSortField,
  order: OrderBy,
  search: string
}

export interface ArticleSchema {
  articleData: Article | null;
  articleList: Article[] | null;
  currentArticlePage: number;
  isFinishedPage: boolean;
  isInit: boolean,
  articleFilters: ArticleFilters
  addToEnd: boolean;
}

export type ViewType = 'CARD' | 'FLAT'

export const articleFiltersSchema = z.object({
  sort: z.nativeEnum(ArticleSortField),
  order: z.nativeEnum(OrderBy),
  search: z.string(),
});
