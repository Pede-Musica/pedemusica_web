import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserListComponent } from './register/user/user-list/user-list.component';
import { UserFormComponent } from './register/user/user-form/user-form.component';
import { ProducerListComponent } from './register/producer/producer-list/producer-list.component';
import { ProducerFormComponent } from './register/producer/producer-form/producer-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    UserFormComponent,
    ProducerListComponent,
    ProducerFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
