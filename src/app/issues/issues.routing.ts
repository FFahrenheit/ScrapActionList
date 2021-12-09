import { Routes } from "@angular/router";
import { AllIssuesComponent } from "./all-issues/all-issues.component";
import { FollowUpComponent } from "./follow-up/follow-up.component";

export const IssuesRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'all',
                component: AllIssuesComponent,
                data: {
                    title: 'All issues'
                }
            },
            {
                path: '8d',
                component: FollowUpComponent,
                data: {
                    title: '8D follow-up'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'all'
            }
        ]
    }  
];