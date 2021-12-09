import { Routes } from "@angular/router";
import { ActionListComponent } from "./action-list/action-list.component";
import { ContainmentComponent } from "./containment/containment.component";
import { DetailsComponent } from "./details/details.component";
import { PreventiveActionsComponent } from "./preventive-actions/preventive-actions.component";
import { ProblemComponent } from "./problem/problem.component";
import { RootCausesComponent } from "./root-causes/root-causes.component";
import { TeamComponent } from "./team/team.component";

export const CreateRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'details',
                component: DetailsComponent,
                data: {
                    title: 'Generate new issue'
                }
            },
            {
                path: ':id/team',
                component: TeamComponent,
                data: {
                    title: 'D1: Form the team'
                }
            },
            {
                path: ':id/problem',
                component: ProblemComponent,
                data: {
                    title: 'D2: Describe the problem'
                }
            },
            {
                path: ':id/containment',
                component: ContainmentComponent,
                data: {
                    title: 'D3: Containment'
                }
            },
            {
                path: ':id/root-causes',
                component: RootCausesComponent,
                data: {
                    title: 'D4: Identify root causes'
                }
            },
            {
                path: ':id/action-list',
                component: ActionListComponent,
                data: {
                    title: 'D5: Corrective actions'
                }
            },
            {
                path: ':id/preventive',
                component: PreventiveActionsComponent,
                data: {
                    title: 'D7: Preventive actions'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details'
            }
        ]
    }  
];