import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '@modules/article/models/article.model';
import { ArticleService } from '@modules/article/services/article.service';
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
    updatedAt: '2026-02-11',
    tags: ['tag1'],
    image: '',
  };

  beforeEach(async () => {
    articleService = jasmine.createSpyObj('ArticleService', ['getAll']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    articleService.getAll.and.returnValue(
      of({
        success: true,
        message: 'Success',
        data: {
          data: [mockArticle],
          totalItems: 1,
          totalPages: 1,
          currentPage: 1,
          pageSize: 10,
        },
        timestamp: new Date().toISOString(),
      })
    );

    const activatedRouteMock = {
      queryParams: of({ page: 1, size: 10 }),
      snapshot: {
        queryParams: { page: 1, size: 10 },
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule,
      ],
      declarations: [DashboardComponent],
      providers: [
        { provide: ArticleService, useValue: articleService },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles on init', () => {
    expect(articleService.getAll).toHaveBeenCalled();
    expect(component.articles.length).toBe(1);
  });

  it('should update query params on page change', () => {
    component.onPageChange({
      pageIndex: 1,
      pageSize: 5,
      length: 10,
    } as any);

    expect(router.navigate).toHaveBeenCalled();
  });
});
