import { Component, Input } from '@angular/core';
import { IMAGES } from '@app/shared/constants';
import { Article } from '@modules/article/models/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;

  readonly fallbackImage = IMAGES.ARTICLE.PLACEHOLDER;

  onImageError(event: Event): void {
    if (event.target instanceof HTMLImageElement) {
      event.target.src = this.fallbackImage;
    }
  }
}
