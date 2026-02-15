import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Article } from '@modules/article/models/article.model';
import { ApiPaginatedResponse } from '@shared/models/api-paginated-response.model';
import { ApiResponse } from '@shared/models/api-response.model';
import { environment } from '@environments/environment';

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
      updatedAt: '2026-02-10',
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

    service.getAll(1, 10).subscribe((res) => {
      expect(res.data.data.length).toBe(1);
      expect(res.data.totalItems).toBe(1);
    });

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/articles`
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('pageSize')).toBe('10');

    req.flush(mockResponse);
  });

  it('should fetch article by id', () => {
    const mockResponse: ApiResponse<Article> = {
      success: true,
      message: 'Success',
      timestamp: new Date().toISOString(),
      data: mockArticles[0],
    };

    service.getById('1').subscribe((res) => {
      expect(res.data.title).toBe('Test Article');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/articles/1`);

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should propagate http errors', () => {
    service.getAll(1, 10).subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        expect(err.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(
      `${environment.baseUrl}/articles?page=1&pageSize=10`
    );

    req.flush(null, { status: 500, statusText: 'Server Error' });
  });
});
