import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'in',
    component: MainLayoutComponent,
    loadChildren: () => import('@app/modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'in',
    pathMatch: 'full'
  }
];
