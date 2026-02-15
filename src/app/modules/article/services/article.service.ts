import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article } from '@modules/article/models/article.model';
import { ApiPaginatedResponse } from '@shared/models/api-paginated-response.model';
import { ApiResponse } from '@shared/models/api-response.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/articles`;

  getAll(page = 1, pageSize = 10): Observable<ApiPaginatedResponse<Article>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<ApiPaginatedResponse<Article>>(this.baseUrl, {
      params,
    });
  }

  getById(id: string): Observable<ApiResponse<Article>> {
    return this.http.get<ApiResponse<Article>>(`${this.baseUrl}/${id}`);
  }
}
