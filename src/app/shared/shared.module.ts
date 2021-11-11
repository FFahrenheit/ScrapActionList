import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    AlertComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderSpinnerComponent,
    AlertComponent,
    FooterComponent
  ]
})
export class SharedModule { }
