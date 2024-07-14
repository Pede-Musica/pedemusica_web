import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NewAccountComponent } from './new-account/new-account.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    NewAccountComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
