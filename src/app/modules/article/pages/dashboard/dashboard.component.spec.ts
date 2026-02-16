import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@modules/article/models/article.model';
import { ApiPaginatedData } from '@shared/models/api-paginated-data.model';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;
  let router: jasmine.SpyObj<Router>;

  const mockArticle: Article = {
    id: '1',
    title: 'Test',
    shortDescription: 'Short',
    description: 'Full',
    author: 'Rahul',
    createdAt: '2026-02-11',
    tags: ['tag1'],
    image: '',
  };

  beforeEach(async () => {
    articleService = jasmine.createSpyObj<ArticleService>('ArticleService', [
      'fetchAllArticles',
    ]);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    const mockResponse: ApiPaginatedData<Article> = {
      data: [mockArticle],
      totalItems: 1,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    };

    articleService.fetchAllArticles.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule,
      ],
      declarations: [DashboardComponent],
      providers: [
        { provide: ArticleService, useValue: articleService },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ page: 1, size: 10 }),
          },
        },
        { provide: Router, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should load articles on init', (): void => {
    expect(articleService.fetchAllArticles).toHaveBeenCalledWith(1, 10);
    expect(component.articles.length).toBe(1);
  });

  it('should update query params on page change', (): void => {
    const pageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: 5,
      length: 10,
      previousPageIndex: 0,
    };

    component.onPageChange(pageEvent);

    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: jasmine.any(Object),
      queryParams: {
        page: 2,
        size: 5,
      },
      queryParamsHandling: 'merge',
    });
  });
});
