import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '@modules/article/models/article.model';
import { ArticleService } from '@modules/article/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articleService = inject(ArticleService);

  article?: Article;
  loading = true;
  error = false;
  fallbackImage = 'assets/images/fallback.jpg';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.articleService.getById(id).subscribe({
      next: (data) => {
        this.article = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.fallbackImage;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
