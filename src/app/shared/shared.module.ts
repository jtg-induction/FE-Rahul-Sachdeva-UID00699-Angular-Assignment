import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@core/components/navbar';

import { ArticleCardComponent } from './components/article-card';
import { LoadingComponent } from './components/loading';
import { NoContentComponent } from './components/no-content';

@NgModule({
  declarations: [
    NavbarComponent,
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
    RouterModule,
    LoadingComponent,
    NoContentComponent,
    ArticleCardComponent,
  ],
})
export class SharedModule {}
