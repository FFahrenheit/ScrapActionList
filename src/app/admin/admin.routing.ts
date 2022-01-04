import { Routes } from "@angular/router";
import { DepartmentsComponent } from "./departments/departments.component";

export const AdminRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'departments',
                component: DepartmentsComponent,
                data:{
                    title: 'Manage departments'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'departments'
            }
        ]
    }
];