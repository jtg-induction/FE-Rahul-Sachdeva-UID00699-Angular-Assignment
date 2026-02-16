import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article } from '@modules/article/models/article.model';
import { ApiPaginatedData } from '@shared/models/api-paginated-data.model';
import { ApiPaginatedResponse } from '@shared/models/api-paginated-response.model';
import { ApiResponse } from '@shared/models/api-response.model';
import { map, Observable } from 'rxjs';

import { ImageConverterService } from './image-converter.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly http = inject(HttpClient);
  private readonly imageConverter = inject(ImageConverterService);

  fetchAllArticles(
    page = 1,
    pageSize = 10
  ): Observable<ApiPaginatedData<Article>> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        pageSize: pageSize.toString(),
      },
    });

    return this.http
      .get<ApiPaginatedResponse<Article>>('/articles', { params })
      .pipe(
        map((response) => ({
          ...response.data,
          data: response.data.data.map((article) =>
            this.normalizeArticle(article)
          ),
        }))
      );
  }

  fetchArticleById(id: string): Observable<Article> {
    return this.http
      .get<ApiResponse<Article>>(`/articles/${id}`)
      .pipe(map((response) => this.normalizeArticle(response.data)));
  }

  private normalizeArticle(article: Article): Article {
    return {
      ...article,
      image: article.image
        ? this.imageConverter.toDisplayableUrl(article.image)
        : undefined,
    };
  }
}
