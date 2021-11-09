import { Routes } from "@angular/router";
import { BlankComponent } from "./layouts/blank/blank.component";

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
    }
];