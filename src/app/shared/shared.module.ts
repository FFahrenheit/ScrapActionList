import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PipesModule } from '../pipes/pipes.module';
import { FiveWhysComponent } from './five-whys/five-whys.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    AlertComponent,
    FooterComponent,
    ConfirmModalComponent,
    FileUploadComponent,
    FiveWhysComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    PipesModule.forRoot(),
    FormsModule
  ],
  exports: [
    LoaderSpinnerComponent,
    AlertComponent,
    FooterComponent,
    ConfirmModalComponent,
    FileUploadComponent,
    FiveWhysComponent
  ]
})
export class SharedModule { }
