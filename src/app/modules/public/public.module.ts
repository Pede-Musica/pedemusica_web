import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { RequestComponent } from './request/request.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
