import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { ArticleCardComponent } from './components/article-card';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar';
import { NoContentComponent } from './components/no-content/no-content.component';
import { FormatDatePipe } from './pipes/format-date.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FormatDatePipe,
    LoadingComponent,
    ArticleCardComponent,
    NoContentComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    FormatDatePipe,
    RouterModule,
    LoadingComponent,
    NoContentComponent,
    ArticleCardComponent,
  ],
})
export class SharedModule {}
