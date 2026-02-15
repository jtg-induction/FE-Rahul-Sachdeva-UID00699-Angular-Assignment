import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGINATION_DEFAULTS } from '@app/shared/constants';
import {
  Article,
} from '@modules/article/models/article.model';
import { PaginationState } from '@modules/article/models/pagination.model';
import { ArticleService } from '@modules/article/services/article.service';
import { ApiPaginatedResponse } from '@shared/models/api-paginated-response.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
export class DashboardComponent implements OnInit, OnDestroy {
  private articleService = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  readonly pageSizeOptions = PAGINATION_DEFAULTS.pageSizeOptions;

  articles: Article[] = [];
  isLoading = false;
 
  pagination: PaginationState = {
    totalItems: 0,
    totalPages: 0,
    pageSize: PAGINATION_DEFAULTS.pageSize,
    pageIndex: PAGINATION_DEFAULTS.pageIndex,
  };

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const page = Number(params['page']);
        const size = Number(params['size']);

        this.pagination.pageIndex =
          page > 0 ? page - 1 : PAGINATION_DEFAULTS.pageIndex;

        this.pagination.pageSize =
          size > 0 ? size : PAGINATION_DEFAULTS.pageSize;

        this.loadArticles();
      });
  }

  private loadArticles(): void {
    this.isLoading = true;

    this.articleService
      .getAll(this.pagination.pageIndex + 1, this.pagination.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (res: ApiPaginatedResponse<Article>) => {
        this.articles = res.data.data;
        this.pagination.totalItems = res.data.totalItems;
          this.pagination.totalPages = res.data.totalPages;
          this.pagination.pageIndex = res.data.currentPage - 1;
          this.pagination.pageSize = res.data.pageSize;
        this.isLoading = false;
      },
      error: () => {
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
