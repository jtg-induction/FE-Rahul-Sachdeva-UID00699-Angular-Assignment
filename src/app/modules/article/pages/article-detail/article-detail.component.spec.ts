import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@modules/article/models/article.model';
import { of, throwError } from 'rxjs';

import { ArticleDetailComponent } from './article-detail.component';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;

  const mockArticle: Article = {
    id: '1',
    title: 'Test Article',
    shortDescription: 'Short',
    description: 'Full description',
    author: 'Rahul',
    updatedAt: '2026-02-11',
    image: '',
    tags: ['tag1'],
  };

  const createActivatedRouteMock = (
    id: string | null,
  ): Partial<ActivatedRoute> => ({
    paramMap: of({
      get: (key: string): string | null => (key === 'id' ? id : null),
    } as ParamMap),
  });

  beforeEach(async () => {
    articleService = jasmine.createSpyObj<ArticleService>('ArticleService', [
      'fetchArticleById',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ArticleDetailComponent],
      providers: [
        { provide: ArticleService, useValue: articleService },
        {
          provide: ActivatedRoute,
          useValue: createActivatedRouteMock('1'),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should load article on init', (): void => {
    articleService.fetchArticleById.and.returnValue(of(mockArticle));

    component.ngOnInit();

    expect(articleService.fetchArticleById).toHaveBeenCalledWith('1');
    expect(component.article).toEqual(mockArticle);
    expect(component.error).toBeFalse();
  });

  it('should handle service error', (): void => {
    articleService.fetchArticleById.and.returnValue(
      throwError(() => new Error('Not found')),
    );

    component.ngOnInit();

    expect(component.article).toBeUndefined();
    expect(component.error).toBeTrue();
  });

  it('should handle missing route id', (): void => {
    TestBed.resetTestingModule();

    articleService = jasmine.createSpyObj<ArticleService>('ArticleService', [
      'fetchArticleById',
    ]);

    TestBed.configureTestingModule({
      declarations: [ArticleDetailComponent],
      providers: [
        { provide: ArticleService, useValue: articleService },
        {
          provide: ActivatedRoute,
          useValue: createActivatedRouteMock(null),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const localFixture = TestBed.createComponent(ArticleDetailComponent);
    const localComponent = localFixture.componentInstance;

    localComponent.ngOnInit();

    expect(articleService.fetchArticleById).not.toHaveBeenCalled();
    expect(localComponent.error).toBeTrue();
  });
});
