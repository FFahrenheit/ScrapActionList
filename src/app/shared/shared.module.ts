import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderSpinnerComponent,
    AlertComponent
  ]
})
export class SharedModule { }
