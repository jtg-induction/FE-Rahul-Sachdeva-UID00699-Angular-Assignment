import { Component, inject, OnInit } from '@angular/core';
import { Article } from '@modules/article/models/article.model';
import { ArticleService } from '@modules/article/services/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private articleService = inject(ArticleService);
  articles: Article[] = [];
  ngOnInit(): void {
    this.articleService.getAll().subscribe((data: Article[]) => {
      this.articles = data;
    });
  }
}
