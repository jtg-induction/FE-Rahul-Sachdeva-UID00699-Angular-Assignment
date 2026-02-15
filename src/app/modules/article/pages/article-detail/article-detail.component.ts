import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMAGES } from '@app/shared/constants';
import { Article } from '@modules/article/models/article.model';
import { ArticleService } from '@modules/article/services/article.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articleService = inject(ArticleService);

  private destroy$ = new Subject<void>();

  article?: Article;
  loading = false;
  error = false;
  fallbackImage = IMAGES.ARTICLE.PLACEHOLDER;

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.handleNotFound();
      return;
    }

    this.fetchArticle(id);
  }

  private fetchArticle(id: string): void {
    this.loading = true;
    this.error = false;

    this.articleService
      .getById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<Article>) => {
          if (!response?.data) {
            this.handleNotFound();
            return;
          }

          this.article = response.data;
          this.loading = false;
        },
        error: () => {
          this.handleNotFound();
        },
      });
  }

  private handleNotFound(): void {
    this.article = undefined;
    this.loading = false;
    this.error = true;
  }

  onImageError(event: Event): void {
    if (event.target instanceof HTMLImageElement) {
      event.target.src = this.fallbackImage;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
