import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '@shared/constants';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: APP_ROUTES.AUTH.LOGIN, component: LoginComponent },
  { path: APP_ROUTES.AUTH.SIGNUP, component: SignupComponent },
  {
    path: APP_ROUTES.ROOT,
    redirectTo: APP_ROUTES.AUTH.LOGIN,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
