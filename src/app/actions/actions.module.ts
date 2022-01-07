import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyActionsComponent } from './my-actions/my-actions.component';
import { RouterModule } from '@angular/router';
import { ActionsRoutes } from './actions.routing';
import { SharedModule } from '../shared/shared.module';
import { ActionDetailComponent } from './action-detail/action-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyActionsComponent,
    ActionDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ActionsRoutes),
    SharedModule,
    FormsModule,
  ]
})
export class ActionsModule { }
