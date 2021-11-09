import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const AuthRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data:{
                    title: 'Login to ScrapActionList'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]
    }
]