import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Article } from '@modules/article/models/article.model';
import { ArticleService } from '@modules/article/services/article.service';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

@Component({
  selector: 'app-article-card',
  template: '',
})
class MockArticleCardComponent {
  @Input() article!: Article;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;

  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'Test 1',
      shortDescription: 'Short 1',
      description: 'Desc 1',
      author: 'Author',
      image: '',
      tags: ['tag1'],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    {
      id: '2',
      title: 'Test 2',
      shortDescription: 'Short 2',
      description: 'Desc 2',
      author: 'Author',
      image: '',
      tags: ['tag2'],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
  ];

  beforeEach(async () => {
    articleService = jasmine.createSpyObj<ArticleService>('ArticleService', [
      'getAll',
    ]);

    articleService.getAll.and.returnValue(of(mockArticles));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, MockArticleCardComponent],
      providers: [{ provide: ArticleService, useValue: articleService }],
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
    expect(component.articles.length).toBe(2);
  });

  it('should render article cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-article-card');
    expect(cards.length).toBe(2);
  });
});
