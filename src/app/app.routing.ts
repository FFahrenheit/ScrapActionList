import { Routes } from "@angular/router";
import { Error404Component } from "./errors/error404/error404.component";
import { Error500Component } from "./errors/error500/error500.component";
import { LoggedGuard } from "./guards/logged.guard";
import { LoginGuard } from "./guards/login.guard";
import { BlankComponent } from "./layouts/blank/blank.component";
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";

export const AppRoutes : Routes = [
    {
        path: '',
        component: BlankComponent,
        canActivate: [ LoginGuard ],
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
        canActivate: [ LoggedGuard ],
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
                path: 'actions',
                loadChildren: () => 
                import('./actions/actions.module').then(
                    m => m.ActionsModule
                )
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'issues'              
            }
        ]
    },
    {
        path: '404',
        component: Error404Component,
        data: {
            title: 'Page not found'
        }
    },
    {
        path: '500',
        component: Error500Component,
        data: {
            title: 'Server error'
        }
    },
    {
        path: '**',
        component: Error404Component,
        data: {
            title: 'Route not found'
        }
    }
];