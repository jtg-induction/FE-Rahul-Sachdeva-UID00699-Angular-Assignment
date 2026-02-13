import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '@modules/article/services/article.service';
import { of } from 'rxjs';

import { ArticleDetailComponent } from './article-detail.component';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let service: jasmine.SpyObj<ArticleService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('ArticleService', ['getById']);

    await TestBed.configureTestingModule({
      declarations: [ArticleDetailComponent],
      providers: [
        { provide: ArticleService, useValue: service },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['id', '1']]) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
  });

  it('should load article', () => {
    service.getById.and.returnValue(
      of({
        id: '1',
        title: 'Test',
        shortDescription: '',
        description: '',
        author: 'Me',
        createdAt: '',
        updatedAt: '',
        tags: [],
      })
    );

    component.ngOnInit();

    expect(component.article?.title).toBe('Test');
  });
});
