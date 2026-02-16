import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@modules/article/models/article.model';
import { PaginationState } from '@modules/article/models/pagination.model';
import { PAGINATION_DEFAULTS } from '@shared/constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly pageSizeOptions = PAGINATION_DEFAULTS.pageSizeOptions;

  articles: Article[] = [];
  isLoading = false;
  isInvalidParams = false;

  pagination: PaginationState = {
    totalItems: 0,
    totalPages: 0,
    pageSize: PAGINATION_DEFAULTS.pageSize,
    pageIndex: PAGINATION_DEFAULTS.pageIndex,
  };

  ngOnInit(): void {
    this.listenToQueryParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenToQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const pageResult = this.resolvePage(params['page']);
        const sizeResult = this.resolvePageSize(params['size']);

        if (!pageResult.valid || !sizeResult.valid) {
          this.isInvalidParams = true;
          this.articles = [];
          return;
        }

        this.isInvalidParams = false;

        this.pagination.pageIndex = pageResult.value - 1;
        this.pagination.pageSize = sizeResult.value;

        this.fetchArticles();
      });
  }

  private resolvePage(value?: string): { valid: boolean; value: number } {
    if (value == null) {
      return {
        valid: true,
        value: PAGINATION_DEFAULTS.pageIndex + 1,
      };
    }

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed <= 0) {
      return { valid: false, value: 0 };
    }

    return { valid: true, value: parsed };
  }

  private resolvePageSize(value?: string): { valid: boolean; value: number } {
    if (value == null) {
      return {
        valid: true,
        value: PAGINATION_DEFAULTS.pageSize,
      };
    }

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed <= 0) {
      return { valid: false, value: 0 };
    }

    return { valid: true, value: parsed };
  }

  private fetchArticles(): void {
    this.isLoading = true;

    this.articleService
      .fetchAllArticles(this.pagination.pageIndex + 1, this.pagination.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.articles = data.data;
          this.pagination.totalItems = data.totalItems;
          this.pagination.totalPages = data.totalPages;
          this.pagination.pageIndex = data.currentPage - 1;
          this.pagination.pageSize = data.pageSize;
        },
        error: () => {
          this.articles = [];
        },
        complete: () => {
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
}
