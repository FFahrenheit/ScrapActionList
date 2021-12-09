import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllIssuesComponent } from './all-issues/all-issues.component';
import { RouterModule } from '@angular/router';
import { IssuesRoutes } from './issues.routing';
import { SharedModule } from '../shared/shared.module';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';



@NgModule({
  declarations: [
    AllIssuesComponent,
    FollowUpComponent,
    IssueDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IssuesRoutes),
    SharedModule
  ]
})
export class IssuesModule { }
