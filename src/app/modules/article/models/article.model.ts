export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  tags: string[];
}
