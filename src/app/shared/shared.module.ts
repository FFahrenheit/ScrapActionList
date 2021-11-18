import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    AlertComponent,
    FooterComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    LoaderSpinnerComponent,
    AlertComponent,
    FooterComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
