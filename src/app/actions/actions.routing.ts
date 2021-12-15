import { Routes } from "@angular/router";
import { ActionDetailComponent } from "./action-detail/action-detail.component";
import { MyActionsComponent } from "./my-actions/my-actions.component";

export const ActionsRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'assigned',
                component: MyActionsComponent,
                data:{
                    title: 'My pending actions'
                }
            },
            {
                path: 'details/:issueId/:actionId',
                component: ActionDetailComponent,
                data:{
                    title: 'Action detail'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'assigned'
            }
        ]
    }
];