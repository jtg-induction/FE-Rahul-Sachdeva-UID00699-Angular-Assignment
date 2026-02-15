import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@app/shared/shared.module';
import { ArticleRoutingModule } from '@modules/article/article-routing.module';
import { DashboardComponent } from '@modules/article/pages/dashboard/dashboard.component';

import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';

@NgModule({
  declarations: [DashboardComponent, ArticleDetailComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class ArticleModule {}
