import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@modules/article/models/article.model';
import { IMAGES } from '@shared/constants';
import { EMPTY, finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly articleService = inject(ArticleService);
  private readonly destroyRef = inject(DestroyRef);

  article?: Article;
  loading = false;
  error = false;
  readonly fallbackImage = IMAGES.ARTICLE.PLACEHOLDER;

  ngOnInit(): void {
    this.initializeArticleStream();
  }

  /**
   * Subscribes to route params and fetches article.
   */
  private initializeArticleStream(): void {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((params) => {
          const id = params.get('id');

          if (!id) {
            this.handleNotFound();
            return EMPTY;
          }

          this.loading = true;
          this.error = false;

          return this.articleService
            .fetchArticleById(id)
            .pipe(finalize(() => (this.loading = false)));
        }),
      )
      .subscribe({
        next: (article) => {
          if (!article) {
            this.handleNotFound();
            return;
          }

          this.article = article;
        },
        error: () => this.handleNotFound(),
      });
  }

  /**
   * Handles not found state.
   */
  private handleNotFound(): void {
    this.article = undefined;
    this.error = true;
  }

  /**
   * Replaces broken image with fallback.
   */
  onImageError(event: Event): void {
    if (event.target instanceof HTMLImageElement) {
      event.target.src = this.fallbackImage;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
