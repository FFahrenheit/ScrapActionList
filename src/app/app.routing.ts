import { Routes } from "@angular/router";
import { BlankComponent } from "./layouts/blank/blank.component";
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";

export const AppRoutes : Routes = [
    {
        path: '',
        component: BlankComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => 
                import('./auth/auth.module').then(
                    m => m.AuthModule
                )
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'auth'
            }
        ]
    },
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'issues',
                loadChildren: () => 
                import('./issues/issues.module').then(
                    m => m.IssuesModule
                )
            },
            {
                path: 'create',
                loadChildren: () => 
                import('./create/create.module').then(
                    m => m.CreateModule
                )
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'issues'              
            }
        ]
    }
];