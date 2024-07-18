import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './register/user/user-list/user-list.component';
import { UserFormComponent } from './register/user/user-form/user-form.component';
import { ProducerListComponent } from './register/producer/producer-list/producer-list.component';
import { ProducerFormComponent } from './register/producer/producer-form/producer-form.component';
import { CustomerListComponent } from './register/customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './register/customer/customer-form/customer-form.component';
import { LocationListComponent } from './register/location/location-list/location-list.component';
import { LocationFormComponent } from './register/location/location-form/location-form.component';
import { MaterialListComponent } from './register/material/material-list/material-list.component';
import { MaterialFormComponent } from './register/material/material-form/material-form.component';
import { ProductListComponent } from './register/product/product-list/product-list.component';
import { ProductFormComponent } from './register/product/product-form/product-form.component';
import { ReportComponent } from './report/report.component';
import { StockComponent } from './stock/stock.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  { path: 'track', component: TrackComponent },
  { path: 'register', component: ReportComponent },
  { path: 'stock', component: StockComponent },

  // Cadastros
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserFormComponent },

  { path: 'producers', component: ProducerListComponent },
  { path: 'producers/new', component: ProducerFormComponent },
  { path: 'producers/:id', component: ProducerFormComponent },

  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/new', component: CustomerFormComponent },
  { path: 'customers/:id', component: CustomerFormComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id', component: ProductFormComponent },

  { path: 'locations', component: LocationListComponent },
  { path: 'locations/new', component: LocationFormComponent },
  { path: 'locations/:id', component: LocationFormComponent },

  { path: 'materials', component: MaterialListComponent },
  { path: 'materials/new', component: MaterialFormComponent },
  { path: 'materials/:id', component: MaterialFormComponent },

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
