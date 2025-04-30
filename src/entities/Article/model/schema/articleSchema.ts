enum BookType {
  TEXT = 'TEXT',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
}

interface BaseBlock {
  id: string;
  type: BookType
}

interface CodeBlock extends BaseBlock{
  type:BookType.CODE;
  code: string;
}

interface ImageBlock extends BaseBlock {
  type:BookType.IMAGE,
  src: string;
  title?: string;
}

interface TextBlock extends BaseBlock {
  type:BookType.TEXT,
  title?: string;
  paragraphs: string[]
}

type BlockType = CodeBlock | ImageBlock | TextBlock;

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number
  createdAt: number;
  type: string[],
  block: BlockType
}

export interface ArticleSchema {
  data: Article | null;
}
