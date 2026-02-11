import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from '@app/modules/article/article-routing.module';
import { DashboardComponent } from '@app/modules/article/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ArticleRoutingModule],
})
export class ArticleModule {}
