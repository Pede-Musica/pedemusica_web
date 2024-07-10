import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from './lib/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage
  ],
  exports: [
    MaterialModule
  ]
})
export class SharedModule { }
