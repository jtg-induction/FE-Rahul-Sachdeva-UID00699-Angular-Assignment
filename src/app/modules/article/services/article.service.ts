import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Article,
  ArticleListResponse,
} from '@modules/article/models/article.model';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);

  getAll(page = 1, pageSize = 10): Observable<ArticleListResponse> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<ArticleListResponse>(
      `${environment.baseUrl}/articles`,
      { params }
    );
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
