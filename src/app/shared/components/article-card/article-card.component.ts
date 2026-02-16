import { Component, Input } from '@angular/core';
import { Article } from '@modules/article/models/article.model';
import { APP_ROUTES, IMAGES } from '@shared/constants';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;

  readonly fallbackImage = IMAGES.ARTICLE.PLACEHOLDER;
  readonly routes = APP_ROUTES;

  get visibleTags(): string[] {
    return this.article.tags.slice(0, 3);
  }

  get remainingTagCount(): number {
    return Math.max(this.article.tags.length - 3, 0);
  }

  onImageError(event: Event): void {
    if (event.target instanceof HTMLImageElement) {
      event.target.src = this.fallbackImage;
    }
  }
}
