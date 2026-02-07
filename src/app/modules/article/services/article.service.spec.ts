import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Article } from '@modules/article/models/article.model';
import { environment } from 'environments/environment';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch and map articles correctly', () => {
    const mockArticles: Article[] = [
      {
        id: '1',
        title: 'Test',
        shortDescription: 'Short',
        description: 'Desc',
        author: 'Author',
        image: '',
        tags: ['tag'],
        createdAt: '2026-01-01',
        updatedAt: '2026-01-01',
      },
    ];

    service.getAll().subscribe((articles) => {
      expect(articles.length).toBe(1);
      expect(articles[0].title).toBe('Test');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/articles`);
    expect(req.request.method).toBe('GET');

    req.flush({
      success: true,
      message: 'ok',
      data: {
        data: mockArticles,
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
      },
      timestamp: new Date().toISOString(),
    });
  });
});
