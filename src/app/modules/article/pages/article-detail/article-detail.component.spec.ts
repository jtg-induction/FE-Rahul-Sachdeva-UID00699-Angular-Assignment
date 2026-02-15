import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Article } from '@modules/article/models/article.model';
import { ArticleService } from '@modules/article/services/article.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { of } from 'rxjs';

import { ArticleDetailComponent } from './article-detail.component';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let service: jasmine.SpyObj<ArticleService>;

  const mockArticle: Article = {
    id: '1',
    title: 'Test',
    shortDescription: '',
    description: 'Full description',
    author: 'Rahul',
    createdAt: '',
    updatedAt: '',
    tags: [],
  };

  beforeEach(async () => {
    service = jasmine.createSpyObj('ArticleService', ['getById']);

    await TestBed.configureTestingModule({
      declarations: [ArticleDetailComponent],
      providers: [
        { provide: ArticleService, useValue: service },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (): string => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
  });

  it('should load article on init', () => {
    const mockResponse: ApiResponse<Article> = {
      success: true,
      message: 'Success',
      timestamp: 'temp',
      data: mockArticle,
    };

    service.getById.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(component.article?.title).toBe('Test');
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });

  it('should handle not found', () => {
    service.getById.and.returnValue(
      of({
        success: true,
        message: '',
        timestamp: '',
        data: null as unknown as Article,
      })
    );

    component.ngOnInit();

    expect(component.error).toBeTrue();
  });
});
