import { Routes } from "@angular/router";
import { AdminGuard } from "../guards/admin.guard";
import { DepartmentsComponent } from "./departments/departments.component";

export const AdminRoutes : Routes = [
    {
        path: '',
        canActivate: [ AdminGuard ],
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