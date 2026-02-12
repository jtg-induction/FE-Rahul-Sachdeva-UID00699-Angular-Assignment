import { Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Article,
  ArticleListResponse,
} from '@modules/article/models/article.model';
import { ArticleService } from '@modules/article/services/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private articleService = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  articles: Article[] = [];
  isLoading = true;

  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] - 1 || 0;
      this.pageSize = +params['size'] || 10;
      this.loadArticles();
    });
  }

  loadArticles(): void {
    this.isLoading = true;

    this.articleService.getAll(this.currentPage + 1, this.pageSize).subscribe({
      next: (res: ArticleListResponse) => {
        this.articles = res.data.data;
        this.totalItems = res.data.totalItems;
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
}
