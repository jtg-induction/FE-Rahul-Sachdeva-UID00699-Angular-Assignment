export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  author: string;
  updatedAt: string;
  image?: string;
  tags: string[];
}
