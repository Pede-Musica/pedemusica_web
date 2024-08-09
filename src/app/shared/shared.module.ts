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
import { LabelComponent } from './components/label/label.component';
import { SelectorProducerComponent } from './components/selector-producer/selector-producer.component';
import { SelectorProductComponent } from './components/selector-product/selector-product.component';
import { LabelRequiredComponent } from './components/label-required/label-required.component';
import { VolumeCard1Component } from './components/volume-card-1/volume-card-1.component';
import { VolumeCard2Component } from './components/volume-card-2/volume-card-2.component';
import { ZeroLengthComponent } from './components/zero-length/zero-length.component';
import { LoadingTransformComponent } from './components/loading-transform/loading-transform.component';

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
    LabelComponent,
    SelectorProducerComponent,
    SelectorProductComponent,
    LabelRequiredComponent,
    VolumeCard1Component,
    VolumeCard2Component,
    ZeroLengthComponent,
    LoadingTransformComponent
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
    NgxMaskDirective,
    LabelComponent,
    LabelRequiredComponent,
    VolumeCard1Component,
    VolumeCard2Component,
    ZeroLengthComponent,
    LoadingTransformComponent
  ],
})
export class SharedModule { }
