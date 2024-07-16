import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserListComponent } from './register/user/user-list/user-list.component';
import { UserFormComponent } from './register/user/user-form/user-form.component';
import { ProducerListComponent } from './register/producer/producer-list/producer-list.component';
import { ProducerFormComponent } from './register/producer/producer-form/producer-form.component';
import { CustomerFormComponent } from './register/customer/customer-form/customer-form.component';
import { CustomerListComponent } from './register/customer/customer-list/customer-list.component';
import { ProductFormComponent } from './register/product/product-form/product-form.component';
import { ProductListComponent } from './register/product/product-list/product-list.component';
import { LocationFormComponent } from './register/location/location-form/location-form.component';
import { LocationListComponent } from './register/location/location-list/location-list.component';
import { MaterialFormComponent } from './register/material/material-form/material-form.component';
import { MaterialListComponent } from './register/material/material-list/material-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    UserFormComponent,
    ProducerListComponent,
    ProducerFormComponent,
    CustomerFormComponent,
    CustomerListComponent,
    ProductFormComponent,
    ProductListComponent,
    LocationFormComponent,
    LocationListComponent,
    MaterialFormComponent,
    MaterialListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
