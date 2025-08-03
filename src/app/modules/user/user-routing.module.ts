import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './register/product/product-list/product-list.component';
import { ProductFormComponent } from './register/product/product-form/product-form.component';
import { ProfileListComponent } from './system/profile/profile-list/profile-list.component';
import { ProfileFormComponent } from './system/profile/profile-form/profile-form.component';
import { SettingComponent } from './setting/setting.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './register/user/user-list/user-list.component';
import { UserFormComponent } from './register/user/user-form/user-form.component';

const routes: Routes = [

  { path: 'requests', component: HomeComponent },
  {
    path: '**',
    redirectTo: 'requests',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
