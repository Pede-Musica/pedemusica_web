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
import { ZeroLengthComponent } from './components/zero-length/zero-length.component';
import { LoadingTransformComponent } from './components/loading-transform/loading-transform.component';
import { DialogTransformComponent } from './components/dialog-transform/dialog-transform.component';
import { SheetVolumeComponent } from './components/sheet-volume/sheet-volume.component';
import { SelectorCustomerComponent } from './components/selector-customer/selector-customer.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DotPulseComponent } from './components/dot-pulse/dot-pulse.component';

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
    ZeroLengthComponent,
    LoadingTransformComponent,
    DialogTransformComponent,
    SheetVolumeComponent,
    SelectorCustomerComponent,
    DialogConfirmComponent,
    DotPulseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgxMaskPipe,
    NgxMaskDirective,
    MatProgressBarModule
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
    ZeroLengthComponent,
    LoadingTransformComponent,
    DialogTransformComponent,
    SheetVolumeComponent,
    SelectorCustomerComponent,
    DialogConfirmComponent,
    MatProgressBarModule,
    DotPulseComponent
  ],
})
export class SharedModule { }
