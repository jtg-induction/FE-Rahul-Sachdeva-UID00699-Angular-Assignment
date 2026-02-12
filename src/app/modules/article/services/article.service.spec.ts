import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  Article,
  ArticleListResponse,
} from '@modules/article/models/article.model';
import { environment } from 'environments/environment';

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
      createdAt: '2026-02-10 06:15:12',
      updatedAt: '2026-02-10 06:15:12',
      image: '',
      tags: ['tag1', 'tag2'],
    },
  ];

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

  it('should fetch all articles with pagination params', () => {
    const mockResponse: ArticleListResponse = {
      success: true,
      message: 'Articles retrieved successfully',
      data: {
        data: mockArticles,
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
      },
      timestamp: new Date().toISOString(),
    };

    service.getAll(1, 10).subscribe((res) => {
      expect(res.data.data.length).toBe(1);
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${environment.baseUrl}/articles` &&
        request.params.get('page') === '1' &&
        request.params.get('pageSize') === '10'
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should fetch article by id', () => {
    const mockSingleResponse = {
      success: true,
      message: 'Success',
      data: mockArticles[0],
      timestamp: new Date().toISOString(),
    };

    service.getById('1').subscribe((article) => {
      expect(article.title).toBe('Test Article');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/articles/1`);

    expect(req.request.method).toBe('GET');

    req.flush(mockSingleResponse);
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
