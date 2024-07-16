import {  CommonModule } from '@angular/common';
import { MaterialModule } from './lib/material.module';
import { ExtraOptions, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TitleComponent } from './components/title/title.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NgxMaskPipe, NgxMaskDirective } from 'ngx-mask'

const config: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'top'
};


@NgModule({
  declarations: [
    LoaderComponent,
    NavigationComponent,
    SidebarComponent,
    TitleComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgxMaskPipe,
    NgxMaskDirective
  ],
  exports: [
    RouterModule,
    MaterialModule,
    LoaderComponent,
    NavigationComponent,
    SidebarComponent,
    TitleComponent,
    LoadingComponent,
    NgxMaskPipe,
    NgxMaskDirective
  ],
})
export class SharedModule { }
