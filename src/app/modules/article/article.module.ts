import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from '@modules/article/article-routing.module';
import { DashboardComponent } from '@modules/article/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ArticleRoutingModule],
})
export class ArticleModule {}
