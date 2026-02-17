export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  author: string;
  createdAt: string;
  image?: string;
  tags: string[];
}
