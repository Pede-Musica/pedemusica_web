import {  CommonModule } from '@angular/common';
import { MaterialModule } from './lib/material.module';
import { ExtraOptions, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const config: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'top'
};


@NgModule({
  declarations: [
    LoaderComponent,
    NavigationComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    MaterialModule,
    LoaderComponent,
    NavigationComponent,
    SidebarComponent
  ],
})
export class SharedModule { }
