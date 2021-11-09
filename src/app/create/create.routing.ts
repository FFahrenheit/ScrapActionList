import { Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";

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
                path: '',
                pathMatch: 'full',
                redirectTo: 'details'
            }
        ]
    }  
];