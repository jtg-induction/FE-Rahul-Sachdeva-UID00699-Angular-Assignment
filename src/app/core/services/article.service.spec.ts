import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Article } from '@modules/article/models/article.model';
import { ApiPaginatedData } from '@shared/models/api-paginated-data.model';
import { ApiPaginatedResponse } from '@shared/models/api-paginated-response.model';
import { ApiResponse } from '@shared/models/api-response.model';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'Test Article',
      shortDescription: 'Short',
      description: 'Full description',
      author: 'Rahul',
      createdAt: '2026-02-10',
      image: '',
      tags: ['tag1', 'tag2'],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService],
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch paginated articles', () => {
    const mockResponse: ApiPaginatedResponse<Article> = {
      success: true,
      message: 'Success',
      timestamp: new Date().toISOString(),
      data: {
        data: mockArticles,
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
      },
    };

    service
      .fetchAllArticles(1, 10)
      .subscribe((res: ApiPaginatedData<Article>) => {
        expect(res.data.length).toBe(1);
        expect(res.totalItems).toBe(1);
      });

    const req = httpMock.expectOne(
      (request) =>
        request.url === '/articles' &&
        request.params.get('page') === '1' &&
        request.params.get('pageSize') === '10'
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should fetch article by id', () => {
    const mockResponse: ApiResponse<Article> = {
      success: true,
      message: 'Success',
      timestamp: new Date().toISOString(),
      data: mockArticles[0],
    };

    service.fetchArticleById('1').subscribe((article: Article) => {
      expect(article.title).toBe('Test Article');
    });

    const req = httpMock.expectOne('/articles/1');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
