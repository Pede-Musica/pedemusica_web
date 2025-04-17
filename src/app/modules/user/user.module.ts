import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserListComponent } from './register/user/user-list/user-list.component';
import { UserFormComponent } from './register/user/user-form/user-form.component';
import { ProductFormComponent } from './register/product/product-form/product-form.component';
import { ProductListComponent } from './register/product/product-list/product-list.component';
import { ReportComponent } from './report/report.component';
import { StockComponent } from './stock/stock.component';
import { ProfileFormComponent } from './system/profile/profile-form/profile-form.component';
import { ProfileListComponent } from './system/profile/profile-list/profile-list.component';
import { SettingComponent } from './setting/setting.component';
import { ReportDetailComponent } from './report/report-detail/report-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    UserFormComponent,
    ProductFormComponent,
    ProductListComponent,
    ReportComponent,
    StockComponent,
    ProfileFormComponent,
    ProfileListComponent,
    SettingComponent,
    ReportDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
