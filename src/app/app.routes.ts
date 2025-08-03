import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: 'admin',
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
    path: '',
    component: PublicLayoutComponent,
    loadChildren: () => import('@app/modules/public/public.module').then(m => m.PublicModule)
  },
  {
    path: '**',
    redirectTo: '',
  }
];
