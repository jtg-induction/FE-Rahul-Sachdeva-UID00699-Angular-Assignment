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

export interface ArticleListResponse {
  success: boolean;
  message: string;
  data: {
    data: Article[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  timestamp: string;
}
