import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@app/shared/shared.module';
import { ArticleRoutingModule } from '@modules/article/article-routing.module';
import { DashboardComponent } from '@modules/article/pages/dashboard/dashboard.component';
import { ArticleCardComponent } from '@shared/components/article-card/article-card.component';

@NgModule({
  declarations: [DashboardComponent, ArticleCardComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
  ],
})
export class ArticleModule {}
