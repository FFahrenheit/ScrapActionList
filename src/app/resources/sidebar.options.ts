import { DashboardRoute } from "../interfaces/dashboard.sidebar.item.interface";

export const publicRoutes : DashboardRoute[] = [
    {
        name: 'Generate issue',
        route: ['create', 'details'],
        detail: 'Create new issue'
    },
    {
        name: 'Consult issues',
        route: ['issues', 'all'],
        detail: 'Recent issues'
    },
    {
        name: 'My actions',
        route: ['actions', 'assigned'],
        detail: 'Check my actions'
    }
];