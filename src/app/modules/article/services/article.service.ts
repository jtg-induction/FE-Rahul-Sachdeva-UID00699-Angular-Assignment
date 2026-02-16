import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiPaginatedData } from '@app/shared/models/api-paginated-data.model';
import { ApiResponse } from '@app/shared/models/api-response.model';
import { Article } from '@modules/article/models/article.model';
import { ApiPaginatedResponse } from '@shared/models/api-paginated-response.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly http = inject(HttpClient);

  /**
   * Fetches paginated articles from the API.
   *
   * @param page - The page number (1-based index).
   * @param pageSize - Number of articles per page.
   *
   * @returns Observable<ApiPaginatedData<Article>>
   */
  fetchAllArticles(
    page = 1,
    pageSize = 10
  ): Observable<ApiPaginatedData<Article>> {
    const params = new HttpParams({
      fromObject: {
        page,
        pageSize,
      },
    });

    return this.http
      .get<ApiPaginatedResponse<Article>>('/articles', { params })
      .pipe(map((response) => response.data));
  }

  /**
   * Fetches a single article by its unique identifier.
   *
   * @param id - The article ID.
   *
   * @returns Observable<Article>
   * Returns the extracted Article object from API response.
   */
  fetchArticleById(id: string): Observable<Article> {
    return this.http
      .get<ApiResponse<Article>>(`/articles/${id}`)
      .pipe(map((response) => response.data));
  }
}
