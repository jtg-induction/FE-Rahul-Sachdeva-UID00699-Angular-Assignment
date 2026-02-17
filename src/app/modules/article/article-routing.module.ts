import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '@shared/constants';

import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: APP_ROUTES.ROOT, component: DashboardComponent },
  { path: APP_ROUTES.ARTICLES.DETAIL, component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
