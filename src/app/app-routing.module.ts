import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { LayoutComponent } from './shared/components/layout';
import { NoContentComponent } from './shared/components/no-content';
import { APP_ROUTES } from './shared/constants';

const routes: Routes = [
  {
    path: APP_ROUTES.ROOT,
    component: LayoutComponent,
    children: [
      {
        path: APP_ROUTES.ROOT,
        redirectTo: APP_ROUTES.ARTICLES.BASE,
        pathMatch: 'full',
      },
      {
        path: APP_ROUTES.ARTICLES.BASE,
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/article/article.module').then(
            (m) => m.ArticleModule,
          ),
      },
    ],
  },
  {
    path: APP_ROUTES.AUTH.BASE,
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: APP_ROUTES.NOT_FOUND,
    component: NoContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
