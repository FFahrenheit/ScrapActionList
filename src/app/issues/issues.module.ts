import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllIssuesComponent } from './all-issues/all-issues.component';
import { RouterModule } from '@angular/router';
import { IssuesRoutes } from './issues.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AllIssuesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IssuesRoutes),
    SharedModule
  ]
})
export class IssuesModule { }
