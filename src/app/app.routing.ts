import { Routes } from "@angular/router";
import { Error404Component } from "./errors/error404/error404.component";
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
        path: '**',
        component: Error404Component,
        data: {
            title: 'Route not found'
        }
    }
];