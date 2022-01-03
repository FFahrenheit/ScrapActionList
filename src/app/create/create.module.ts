import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { CreateRoutes } from './create.routing';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamComponent } from './team/team.component';
import { ProblemComponent } from './problem/problem.component';
import { ContainmentComponent } from './containment/containment.component';
import { RootCausesComponent } from './root-causes/root-causes.component';
import { ActionListComponent } from './action-list/action-list.component';
import { PreventiveActionsComponent } from './preventive-actions/preventive-actions.component';
import { CloseComponent } from './close/close.component';
import { AddPreventiveComponent } from './add-preventive/add-preventive.component';



@NgModule({
  declarations: [
    DetailsComponent,
    TeamComponent,
    ProblemComponent,
    ContainmentComponent,
    RootCausesComponent,
    ActionListComponent,
    PreventiveActionsComponent,
    CloseComponent,
    AddPreventiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CreateRoutes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CreateModule { }
