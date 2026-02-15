import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '@modules/article/models/article.model';
import { ArticleService } from '@modules/article/services/article.service';
import { ApiPaginatedResponse } from '@shared/models/api-paginated-response.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private articleService = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  articles: Article[] = [];
  isLoading = false;

  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const page = +params['page'] || 1;
        const size = +params['size'] || 10;

        if (page <= 0 || size <= 0) {
          this.articles = [];
          return;
        }

        this.currentPage = page - 1;
        this.pageSize = size;

        this.loadArticles();
      });
  }

  loadArticles(): void {
    this.isLoading = true;

    this.articleService
      .getAll(this.currentPage + 1, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ApiPaginatedResponse<Article>) => {
          this.articles = res.data.data;
          this.totalItems = res.data.totalItems;
          this.isLoading = false;
        },
        error: () => {
          this.articles = [];
          this.isLoading = false;
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.pageIndex + 1,
        size: event.pageSize,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
