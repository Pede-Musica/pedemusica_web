import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './register/product/product-list/product-list.component';
import { ProductFormComponent } from './register/product/product-form/product-form.component';
import { PersonListComponent } from './register/person/person-list/person-list.component';
import { PersonFormComponent } from './register/person/person-form/person-form.component';
import { ProfileListComponent } from './system/profile/profile-list/profile-list.component';
import { ProfileFormComponent } from './system/profile/profile-form/profile-form.component';
import { SettingComponent } from './setting/setting.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },


  // Cadastros
  { path: 'users', component: PersonListComponent },
  { path: 'users/new', component: PersonFormComponent },
  { path: 'users/:id', component: PersonFormComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id', component: ProductFormComponent },

  { path: 'profiles', component: ProfileListComponent },
  { path: 'profiles/new', component: ProfileFormComponent },
  { path: 'profiles/:id', component: ProfileFormComponent },

  { path: 'setting', component: SettingComponent },

  {
    path: '**',
    redirectTo: 'track',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
