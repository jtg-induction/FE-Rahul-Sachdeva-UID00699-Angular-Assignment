import { HttpClient } from '@angular/common/http';
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
  private readonly baseUrl = `${environment.baseUrl}/articles`;

  getAll(): Observable<Article[]> {
    return this.http
      .get<ArticleListResponse>(this.baseUrl)
      .pipe(map((res) => res.data.data));
  }
}
