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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssueComponent } from './issue/issue.component';
import { SortDirective } from '../directives/sort.directive';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { DetailComponent } from './detail/detail.component';
import { FileViewComponent } from './file-view/file-view.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';



@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    AlertComponent,
    FooterComponent,
    ConfirmModalComponent,
    FileUploadComponent,
    FiveWhysComponent,
    IssueComponent,
    SortDirective,
    ErrorMessageComponent,
    DetailComponent,
    FileViewComponent,
    FilterModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    PipesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoaderSpinnerComponent,
    AlertComponent,
    FooterComponent,
    ConfirmModalComponent,
    DetailComponent,
    FileUploadComponent,
    FiveWhysComponent,
    IssueComponent,
    SortDirective,
    ErrorMessageComponent,
    FilterModalComponent
  ]
})
export class SharedModule { }
