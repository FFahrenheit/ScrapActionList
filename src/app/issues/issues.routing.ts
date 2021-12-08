import { Routes } from "@angular/router";
import { AllIssuesComponent } from "./all-issues/all-issues.component";

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
                path: '',
                pathMatch: 'full',
                redirectTo: 'all'
            }
        ]
    }  
];