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



@NgModule({
  declarations: [
    DetailsComponent,
    TeamComponent,
    ProblemComponent,
    ContainmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CreateRoutes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CreateModule { }
