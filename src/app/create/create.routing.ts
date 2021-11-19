import { Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
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
                path: '',
                pathMatch: 'full',
                redirectTo: 'details'
            }
        ]
    }  
];