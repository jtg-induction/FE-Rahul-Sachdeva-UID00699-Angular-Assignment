import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Article } from '@modules/article/models/article.model';

import { ArticleCardComponent } from './article-card.component';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  const mockArticle: Article = {
    id: '1',
    title: 'Test Title',
    shortDescription: 'Short Description',
    description: 'Full Description',
    author: 'John Doe',
    updatedAt: '2026-01-01',
    image: '',
    tags: ['angular', 'testing', 'unit', 'spec', 'extra'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ArticleCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    component.article = mockArticle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display author', () => {
    const author = fixture.debugElement.query(
      By.css('.article-card__author'),
    ).nativeElement;

    expect(author.textContent).toContain('John Doe');
  });

  it('should display title', () => {
    const title = fixture.debugElement.query(
      By.css('.article-card__title'),
    ).nativeElement;

    expect(title.textContent).toContain('Test Title');
  });

  it('should show sliced tags + more indicator', () => {
    const tags = fixture.debugElement.queryAll(By.css('.article-card__tag'));

    expect(tags.length).toBe(4);
  });

  it('should show +more correctly', () => {
    const moreTag = fixture.debugElement.query(
      By.css('.article-card__tag--more'),
    ).nativeElement;

    expect(moreTag.textContent).toContain('+2');
  });
});
