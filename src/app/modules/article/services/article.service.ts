import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article } from '@modules/article/models/article.model';
import { ApiPaginatedResponse } from '@shared/models/api-paginated-response.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly http = inject(HttpClient);

  getAll(page = 1, pageSize = 10): Observable<ApiPaginatedResponse<Article>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<ApiPaginatedResponse<Article>>('/articles', {
      params,
    });
  }

  getById(id: string): Observable<Article> {
    return this.http
      .get<{
        success: boolean;
        data: Article;
      }>(`${environment.baseUrl}/articles/${id}`)
      .pipe(map((res) => res.data));
  }
}
