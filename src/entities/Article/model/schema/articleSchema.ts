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

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number
  createdAt: number;
  tags: string[],
  blocks: BlockType[]
}

export interface ArticleSchema {
  data: Article | null;
}
