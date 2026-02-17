import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@shared/components/navbar';

import { ArticleCardComponent } from './components/article-card';
import { LayoutComponent } from './components/layout';
import { LoadingComponent } from './components/loading';
import { NoContentComponent } from './components/no-content';
import { SnackbarComponent } from './components/snackbar';

@NgModule({
  declarations: [
    ArticleCardComponent,
    LayoutComponent,
    NavbarComponent,
    LoadingComponent,
    NoContentComponent,
    SnackbarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatPaginatorModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    LoadingComponent,
    NoContentComponent,
    ArticleCardComponent,
    LayoutComponent,
  ],
})
export class SharedModule {}
