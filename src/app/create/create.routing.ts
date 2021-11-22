import { Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { ProblemComponent } from "./problem/problem.component";
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
                path: 'team',
                component: TeamComponent,
                data: {
                    title: 'D1: Form the team'
                }
            },
            {
                path: 'problem',
                component: ProblemComponent,
                data: {
                    title: 'D2: Describe the problem'
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